import GameLobby from "../../game/logic/lobby";

class LobbyRegistry {
    
    constructor(app) {
        this.app = app;
        this.lobbies = {};
    }

    create(client) {
        const lobby = new GameLobby(client);
        const lobbyId = this.app.get('idGenerator').generate()
        this.lobbies[lobbyId] = lobby;
        return lobbyId;
    }

    findAll() {
        const lobbies = []
        for (let id in this.lobbies) {
            lobbies.push({id, host: this.lobbies[id].host.nickname});
        }

        return lobbies;
    }
}

export default LobbyRegistry;

// type: "game.throw" => math.random()
// game - controller, throw - controller method