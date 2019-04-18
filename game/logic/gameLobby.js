class GameLobby {
    constructor(host, id) {
        this.id = id;
        this.host = host;
        this.clients = [];
        this.readyTable = {};
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
                id: client.getId(),
                isHost: client === this.host,
                isReady: this.readyTable[client.getId()]
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
        if (this.isFull()) {
            return false;
        }

        let clients = this.getClients();

        for (let i in clients) {
            if (client.getId() === clients[i].getId()) {
                return false;
            }
        }

        this.clients.push(client);
        this.readyTable[client.getId()] = false;

        return true;
    }

    leave(leftClient) {
        if (leftClient === this.host) {
            this.host = this.clients.shift();
        } else {
            this.clients = this.clients.filter((client) => client !== leftClient)
            delete this.readyTable[leftClient.getId()];
        }
    }

    ready(client) {
        this.readyTable[client.getId()] = !this.readyTable[client.getId()];
    }

    isReadyForStart() {
        if (this.getClientsCount() < 4) {
            return false;
        }

        for (let i in this.readyTable) {
            if (this.readyTable[i] === false) {
                return false;
            }
        }

        return true;
    }

    isFull() {
        return this.getClientsCount() === 7;
    }
}

export default GameLobby;