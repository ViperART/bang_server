import GameLobby from "../../game/logic/gameLobby";

class LobbyRegistry {
    
    constructor(app) {
        this.app = app;
        this.lobbies = {};
    }

    create(client) {
        const lobbyId = this.app.get('idGenerator').generate();
        this.lobbies[lobbyId] = new GameLobby(client, lobbyId);
        return this.lobbies[lobbyId];
    }

    findAll() {
        let lobbies = [];
        for (let id in this.lobbies) {
            lobbies.push({
                id,
                host: this.lobbies[id].host.getNickname(),
                clientsCount: this.lobbies[id].getClientsCount()
            });
        }

        return lobbies;
    }

    findById(id) {
        for (let lobbyId in this.lobbies) {
            if (id === lobbyId) {
                return this.lobbies[id];
            }
        }

        return null;
    }

    remove(id) {
        delete this.lobbies[id]
    }

    removeClientFromAllLobbies(client) {
        for (let id in this.lobbies) {
            let lobbyObject = this.lobbies[id];
            if (lobbyObject.hasClient(client)) {
                lobbyObject.leave(client);
                if (lobbyObject.getClientsCount() === 0) {
                    this.remove(id);
                } else {
                    this.app.get('sender').sendTo('lobby', 'onClientLeft', lobbyObject.getClientsView(), lobbyObject.getClients());
                }
            }
        }
    }

}

export default LobbyRegistry;

// type: "game.throw" => math.random()
// game - controller, throw - controller method