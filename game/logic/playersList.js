import Player from "../player";
import Weapon from "../cards/weapon";

class PlayersList {
    constructor(clients) {
        this.players = clients.map(client => new Player(client));
        this._initWeapons();
    }

    getAll() {
        return this.players;
    }

    getPlayerView(client) {
        let view = [];

        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                let player = this.players[i];

                // TODO: distance!!!!!!
                let info = {
                    hp: player.getHealthPoints(),
                    buffs: player.getBuffs(),
                    hero: player.getHero(),
                    weapon: player.getWeapon(),
                    cardsCount: player.getCards().length,
                    nickname: player.getNickname()
                };

                if (player.isMe(client)) {
                    info['role'] = player.getRole();
                    info['cards'] = player.getCards();
                }

                view.push(info);
            }
        }

        return view
    }

    getSheriff() {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                if (this.players[i].isSheriff()) {
                    return this.players[i];
                }
            }
        }

        return null;
    }

    _initWeapons() {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                this.players[i].setWeapon(new Weapon('Кольт .45', 1, 1, 1));
            }
        }
    }
}

export default PlayersList;