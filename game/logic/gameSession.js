import Player, {PlayerRole} from "../player";
import {getHeroes} from "../data/heroes";
import {cardsList} from "../data/cards";
import CardDealer from "./cardDealer";
import PlayersList from "./playersList";
import DistanceChecker from "./distanceChecker";
import BangState from "../state/bang";

class GameSession {
    constructor(id, clients, announcer) {
        this.id = id;
        this.players = new PlayersList(clients);
        this.deck = new CardDealer([...cardsList].shuffle());
        this.currentPlayer = null;
        this.announcer = announcer;

        this._prepare();
        this.turnStart();

        this.state = null;
    }

    turnStart() {
        this._giveCardsToPlayerFromDeck(this.currentPlayer, 2);
        this.turnState = {
            isBangThrown: false
        }
    }

    skip() {
        if (this.state !== null && this.state.hasEnded()) {
            if (this.state instanceof BangState) {
                this.turnState.isBangThrown = true;
            }

            this.state = null;
        }

        if (this.state === null) {
            throw 'Скипнули ответ когда нет состояния?'
        }

        this.state.update(null);
        this.currentPlayer = this.state.getCurrentPlayer();
    }

    throwCard(cardIndex, receiverPlayerId) {
        if (this.state !== null && this.state.hasEnded()) {

            if (this.state instanceof BangState) {
                this.turnState.isBangThrown = true;
            }

            this.state = null;
        }

        let card = this.currentPlayer.getCard(cardIndex);

        if (!card) {
            throw 'Card ' + cardIndex + ' not found in current player';
        }

        // TODO: check for barrel on receiver, or check for miss card


        if (this.state !== null) {
            this.state.update(card);
            this.currentPlayer = this.state.getCurrentPlayer();

            return;
        }

        if (card.isWeapon()) {
            this._handleWeaponCard(card, cardIndex);
        }

        if (card.isBuff()) {
            this._handleBuffCard(card, cardIndex, receiverPlayerId);
        }

        if (card.isAction()) {
            this._handleActionCard(card, cardIndex, receiverPlayerId);
        }
    }



    turnEnd() {
        if (this.currentPlayer.getCards().length > this.currentPlayer.getHealthPoints()) {
            throw 'Количество карт в руке превышает текущее здоровье'
        }

        let index = this.players.getAll().indexOf(this.currentPlayer) + 1;
        if (index === this.players.getAll().length) {
            index = 0;
        }

        let nextPlayer = this.players.getAll()[index];

        this.announcer.announce('Передаю эстафету %player%', this.currentPlayer, this.getClients(), nextPlayer);
        this.setCurrentPlayer(nextPlayer);
        this.state = null;
        this.turnStart()
    }

    getClients() {
        return this.players.getAll().map((player) => player.getClient());
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    isCurrentPlayer(client) {
        return client.getId() === this.currentPlayer.getId();
    }

    getGameViewForClient(client) {
        return {
            gameId: this.id,
            currentPlayerId: this.currentPlayer.getId(),
            players: this.players.getPlayerView(client),
            state: this.state ? this.state.getView() : null,
            cardsLeft: this.deck.getCardsCount(),
            cardsUsed: this.deck.getUsedCardsCount(),
            attackDistances: this._getAttackDistances(),
            defenseDistances: this._getDefenseDistances()
        };
    }

    _handleWeaponCard(card, cardIndex) {
        if (this.players.hasWeapon(card)) {
            throw card.getName() + ' уже присутствует на столе';
        }

        this.currentPlayer.setWeapon(card);
        this.currentPlayer.takeCard(cardIndex); // remove card from player hand

        this.announcer.announce('Пожалуй, возьму ствол посерьезнее.', this.currentPlayer, this.getClients());
    }

    _handleBuffCard(card, cardIndex, receiverPlayerId) {
        if (this.players.hasBuff(card)) {
            throw card.getName() + ' уже присутствует на столе';
        }

        if (card.isJail()) {
            if (!receiverPlayerId) {
                throw 'receiverPlayerId not set!';
            }

            let receiver = this.players.findById(receiverPlayerId);
            if (receiver.isSheriff()) {
                throw 'Нельзя посадить шерифа в тюрьму';
            }

            receiver.addBuff(card);

            this.announcer.announce('Отдохни-ка пока за решеткой, %player%', this.currentPlayer, this.getClients(), receiver);

        } else {
            this.currentPlayer.addBuff(card);
        }

        this.currentPlayer.takeCard(cardIndex); // remove card from player hand
    }

    _handleActionCard(card, cardIndex, receiverPlayerId) {
        let receiver = this.players.findById(receiverPlayerId);
        if (card.isBang()) {

            if (this.turnState.isBangThrown && !this.currentPlayer.canThrowUnlimitedBangs()) {
                throw 'Вы не можете разыграть более одной карты "Бах!" в ход'
            }

            if (!DistanceChecker.canReachTarget(this.currentPlayer, receiver, this.players.getAll())) {
                throw 'Вы не можете достать до этого игрока';
            }

            if (this.state !== null) {
                throw 'Кинули бэнг когда уже есть активное состояние?'
            }

            this.deck.discard(this.currentPlayer.takeCard(cardIndex));
            this.state = new BangState(this.deck, this.currentPlayer, receiver, card);
            this.currentPlayer = this.state.getCurrentPlayer();

            return;
        }

        if (card.isPanic()) {

            if (!DistanceChecker.canReachTarget(this.currentPlayer, receiver, this.players.getAll())) {
                throw 'Вы не можете достать до этого игрока';
            }

            if (receiver.getAvailableCards().length === 0) {
                throw 'У этого игрока нет доступных для изъятия карт'
            }

            this.currentPlayer.addCard(receiver.takeCard(0)); //TODO Выбор карты
        }

        if (card.isDiligenza()) {
            this._giveCardsToPlayerFromDeck(this.currentPlayer, 2);
        }

        if (card.isWellsFargo()) {
            this._giveCardsToPlayerFromDeck(this.currentPlayer, 3);
        }

        if (card.isGatling() && true) {  //TODO проверка на ответ "Мимо"
            this.players.getAll().forEach(player => {
                if (player !== this.currentPlayer) {
                    player.loseHealthPoints(1)
                }
            });
        }

        if (card.isIndians() && true) {   //TODO Проверка на сброс Бэнга
            this.players.getAll().forEach(player => {
                if (player !== this.currentPlayer) {
                    player.loseHealthPoints(1)
                }
            });
        }

        if (card.isSaloon()) {
            this.players.getAll().forEach(player => {
                player.addHealthPoints(1);
            });
        }

        if (card.isBeer()) {
            if (this.currentPlayer.getHealthPoints() === this.currentPlayer.getMaxHealthPoints()) {
                throw 'У Вас уже максимальное количество здоровья'
            }

            this.currentPlayer.addHealthPoints(1);
        }

        if (card.isCatBalou()) {

            if (receiver.getAvailableCards().length === 0) {
                throw 'У этого игрока нет доступных для изъятия карт'
            }

            this.deck.discard(receiver.takeCard(0)); //TODO Выбор карты
        }

        if (card.isShop()) {
            let shopSelection = this.deck.takeMany(this.players.getAll().length);
            for (let i = 0; i < shopSelection.length; i++) {
                this.players.getAll()[i].addCard(shopSelection[i]); //TODO Выбор карты из магазина
            }

        }

        this.deck.discard(this.currentPlayer.takeCard(cardIndex));  // remove card from player hand and add it to used cards
    }

    _getAttackDistances() {
        let distances = {};

        this.players.getAll().forEach(player => {
            if (player !== this.currentPlayer) {
                distances[player.getId()] = DistanceChecker.getFinalDistance(this.currentPlayer, player, this.players.getAll());
            }
        });

        return distances;
    }

    _getDefenseDistances() {
        let distances = {};

        this.players.getAll().forEach(player => {
            if (player !== this.currentPlayer) {
                distances[player.getId()] = DistanceChecker.getFinalDistance(player, this.currentPlayer, this.players.getAll());
            }
        });

        return distances;
    }

    _prepare() {
        this._assignRolesToPlayers();
        this._assignHeroesToPlayers();
        this.setCurrentPlayer(this.players.getSheriff());
        this._giveCardsToPlayers();
    }

    _assignRolesToPlayers() {
        const basePlayersRoles = [PlayerRole.SHERIFF, PlayerRole.RENEGADE, PlayerRole.OUTLAW, PlayerRole.OUTLAW];

        const rolesByPlayersCount = {
            4: [],
            5: [PlayerRole.DEPUTY],
            6: [PlayerRole.DEPUTY, PlayerRole.OUTLAW],
            7: [PlayerRole.DEPUTY, PlayerRole.OUTLAW, PlayerRole.DEPUTY],
        };


        let roles = basePlayersRoles.concat(rolesByPlayersCount[this.players.length]);
        //let roles = basePlayersRoles.concat(rolesByPlayersCount[this.players.length]).shuffle(); TODO: ENABLE AFTER DEBUG

        let players = this.players.getAll();

        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                players[i].setRole(roles[i]);
            }
        }
    }

    _assignHeroesToPlayers() {
        let players = this.players.getAll();
        let shuffledHeroes = getHeroes(players.length);

        players.forEach((player, index) => {
            player.setHero(shuffledHeroes[index])
        });
    }


    _giveCardsToPlayers() {
        let players = this.players.getAll();
        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                this._giveCardsToPlayerFromDeck(players[i], players[i].getHealthPoints());
            }
        }
    }

    _giveCardsToPlayerFromDeck(player, cardsCount) {
        for (let i = 0; i < cardsCount; i++) {
            player.addCard(this.deck.takeOne());
        }
    }
}

export default GameSession;