import GameSession from "./gameSession";

class GameLobby {
    constructor(host, id) {
        this.id = id;
        this.host = host;
        this.clients = [];
        this.gameSession = null;
    }

    getId() {
        return this.id;
    }

    getClients() {
        return [this.host, ...this.clients]
    }

    getClientsView() {
        return this.getClients().map((client) => {
            return {
                nickname: client.getNickname(),
                isHost: client === this.host
            }
        })
    }

    hasClient(client) {
        let clients = this.getClients();
        for (let i in clients) {
            if (clients[i] === client) {
                return true;
            }
        }

        return false;
    }

    getClientsCount() {
        if (!this.host) {
            return 0;
        }

        return this.getClients().length;
    }

    join(client) {
        let clients = this.getClients();
        for (let i in clients) {
            if (client.getId() === clients[i].getId()) {
                return;
            }
        }

        this.clients.push(client)
    }

    leave(leftClient) {
        if (leftClient === this.host) {
            this.host = this.clients.shift();
        } else {
            this.clients = this.clients.filter((client) => client !== leftClient)
        }
    }
}

export default GameLobby;