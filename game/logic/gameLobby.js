import GameSession from "./gameSession";

class GameLobby {
    constructor(host) {
        this.host = host;
        this.players = [];
        this.gameSession = null;
    }

    // TODO: Need Client class (getId(), getNickname(), getSocket())

    getPlayers() {
        return [this.host, ...this.players]
    }

    join(client) {
        let players = [this.host, ...this.players];
        for (let i in players) {
            if (client.ws.id === players[i].ws.id) {
                return;
            }
        }

        this.players.push(client)
    }
}

export default GameLobby;