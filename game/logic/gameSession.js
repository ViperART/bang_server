import Player, {PlayerRole} from "../player";
import {getHeroes} from "../data/heroes";
import {cardsList} from "../data/cards";
import CardDealer from "./cardDealer";
import PlayersList from "./playersList";



class GameSession {
    constructor(id, clients) {
        this.id = id;
        this.players = new PlayersList(clients);
        this.cards = new CardDealer(cardsList.shuffle());

        this._prepare();

        this.state = null;
        this.currentPlayer = null;
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    getGameViewForClient(client) {

    }

    _prepare() {
        this._assignRolesToPlayers();
        this._assignHeroesToPlayers();
        this._giveCardsToPlayers();

        this.setCurrentPlayer(this.players.getSheriff());
    }

    _assignRolesToPlayers() {
        const basePlayersRoles = [PlayerRole.SHERIFF, PlayerRole.RENEGADE, PlayerRole.OUTLAW, PlayerRole.OUTLAW];

        const rolesByPlayersCount = {
            4: [],
            5: [PlayerRole.DEPUTY],
            6: [PlayerRole.DEPUTY, PlayerRole.OUTLAW],
            7: [PlayerRole.DEPUTY, PlayerRole.OUTLAW, PlayerRole.DEPUTY],
        };

        let roles = basePlayersRoles.concat(rolesByPlayersCount[this.players.length]).shuffle();
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

        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                players[i].setHero(shuffledHeroes[i]);
            }
        }
    }


    _giveCardsToPlayers() {
        let players = this.players.getAll();
        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                players[i].setCards(this.cards.take(players[i].getHealthPoints()));
            }
        }
    }
}

export default GameSession;