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

    findById(id) {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                let player = this.players[i];
                if (player.getId() === id) {
                    return player;
                }
            }
        }

        return null;
    }

    hasWeapon(weapon) {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                let player = this.players[i];
                if (weapon.equals(player.getWeapon())) {
                    return true;
                }
            }
        }

        return false;
    }

    hasBuff(buff) {
        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                let player = this.players[i];
                let buffs = player.getBuffs();
                for (let j in buffs) {
                    if (buffs.hasOwnProperty(j)) {
                        if (buff.equals(buffs[j])) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    getPlayerView(client) {
        let view = [];

        for (let i in this.players) {
            if (this.players.hasOwnProperty(i)) {
                let player = this.players[i];

                // TODO: distance!!!!!!
                let info = {
                    id: player.getId(),
                    hp: player.getHealthPoints(),
                    buffs: player.getBuffs(),
                    hero: player.getHero(),
                    weapon: player.getWeapon(),
                    cardsCount: player.getCards().length,
                    nickname: player.getNickname(),
                    isSheriff: player.isSheriff(),
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
                this.players[i].setWeapon(Weapon.createDefaultWeapon());
            }
        }
    }
}

export default PlayersList;