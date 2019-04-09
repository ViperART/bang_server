import GameSession from "./gameSession";

class GameLobby {
    constructor(host) {
        this.host = host;
        this.participants = [];
        this.gameSession = null;
    }
}

export default GameLobby;