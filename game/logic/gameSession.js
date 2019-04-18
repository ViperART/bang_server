import Player, {PlayerRole} from "../player";

class GameSession {
    constructor(id, clients) {
        this.id = id;

        this.players = clients.map(client => new Player(client));

        this.cards = [];
        this.usedCards = [];

        this.state = null;
        this.currentPlayer = null;
    }

    _prepare() {
        this._assignRolesToPlayers();
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
        roles.sort(this._compareRandom);

        for (let i in this.players) {
            this.players[i].setRole(roles[i]);
        }
    }

    _compareRandom(a, b) {
        return Math.random() - 0.5;
    }

}

export default GameSession;

/*
Подготовка:

1. Раздать всем роли по правилам игры (done)
2. Инициализация колоды персов и её перемешка
3. Назначение персов на игроков (с их характеристиками)
4. Перемешка основного пула карт
5. Раздача карт игрокам в соотвествии со здоровьем





 */