import GameSession from "../../game/logic/gameSession";

class GameRegistry {
    
    constructor(app) {
        this.app = app;
        this.games = {};
    }

    create(clients) {
        const gameId = this.app.get('idGenerator').generate();
        this.games[gameId] = new GameSession(gameId, clients, this.app.get('announcer'));
        return this.games[gameId];
    }

    findById(id) {
        for (let gameId in this.games) {
            if (id === gameId) {
                return this.games[id];
            }
        }

        return null;
    }

    remove(id) {
        delete this.games[id]
    }

}

export default GameRegistry;