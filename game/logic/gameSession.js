import Player, {PlayerRole} from "../player";
import {getHeroes} from "../data/heroes";
import {cardsList} from "../data/cards";
import Weapon from "../cards/weapon";
import CardDealer from "./cardDealer";

class GameSession {
    constructor(id, clients) {
        this.id = id;
        this.players = clients.map(client => new Player(client));
        this.cards = new CardDealer(cardsList.shuffle());

        this.state = null;
        this.currentPlayer = null;
    }

    _prepare() {
        this._assignRolesToPlayers();
        this._assignHeroesToPlayers();
        this._assignWeaponsToPlayers();
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

        let roles = basePlayersRoles.concat(rolesByPlayersCount[this.players.length]).shuffle();

        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                this.players[i].setRole(roles[i]);
            }
        }
    }

    _assignHeroesToPlayers() {
        let shuffledHeroes = getHeroes(this.players.length);
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                this.players[i].setHero(shuffledHeroes[i]);
            }
        }
    }

    _assignWeaponsToPlayers() {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                this.players[i].setWeapon(new Weapon('Кольт .45', 1, 1, 1));
            }
        }
    }

    _giveCardsToPlayers() {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                this.players[i].setCards(this.cards.take(this.players[i].getHealthPoints()));
            }
        }
    }
}

export default GameSession;