import GameLobby from "../../game/logic/gameLobby";

class LobbyRegistry {
    
    constructor(app) {
        this.app = app;
        this.lobbies = {};
    }

    create(client) {
        const lobby = new GameLobby(client);
        const lobbyId = this.app.get('idGenerator').generate()
        this.lobbies[lobbyId] = lobby;
        return this.lobbies[lobbyId];
    }

    findAll() {
        const lobbies = []
        for (let id in this.lobbies) {
            lobbies.push({id, host: this.lobbies[id].host.nickname});
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
}

export default LobbyRegistry;

// type: "game.throw" => math.random()
// game - controller, throw - controller method