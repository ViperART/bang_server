import Player, {PlayerRole} from "../player";
import {getHeroes} from "../data/heroes";
import {cardsList} from "../data/cards";
import CardDealer from "./cardDealer";
import PlayersList from "./playersList";
import DistanceChecker from "./distanceChecker";

class GameSession {
    constructor(id, clients) {
        this.id = id;
        this.players = new PlayersList(clients);
        this.deck = new CardDealer([...cardsList].shuffle());
        this.currentPlayer = null;

        this.receiver = null;

        this._prepare();
        this.turnStart();
    }

    turnStart() {
        this._giveCardsToPlayerFromDeck(this.currentPlayer, 2);
    }

    throwCard(cardIndex, receiverPlayerId) {
        let card = this.currentPlayer.getCard(cardIndex);

        if (!card) {
            throw 'Card ' + cardIndex + ' not found in current player';
        }

        if (card.isWeapon()) {
            if (this.players.hasWeapon(card)) {
                throw 'Weapon ' + card.getName() + ' exists on table';
            }

            this.currentPlayer.setWeapon(card);
            this.currentPlayer.takeCard(cardIndex); // remove card from player hand
        }

        // TODO: show under player icon, two distances
        // TODO: check distances on client same as server

        if (card.isBuff()) {
            if (this.players.hasBuff(card)) {
                throw 'Buff ' + card.getName() + ' exists on table';
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
            } else {
                this.currentPlayer.addBuff(card);
            }

             this.currentPlayer.takeCard(cardIndex); // remove card from player hand
        }

        if (card.isAction()) {

            let receiver = this.players.findById(receiverPlayerId);

            if (card.isBang() && true) { //TODO проверка на ответ "Мимо"
                if (!DistanceChecker.canReachTarget(this.currentPlayer, receiver, this.players.getAll())) {
                    throw 'Вы не можете достать до игрока!';
                }

                receiver.loseHealthPoints(1);
            }

            if (card.isPanic()) {

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
    }

    turnEnd() {
        // set next player as current player
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
            cardsLeft: this.deck.getCardsCount(),
            cardsUsed: this.deck.getUsedCardsCount()
        };
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