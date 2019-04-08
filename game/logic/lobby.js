import GameSession from "./gameSession";

class GameLobby {
    constructor(host) {
        this.id = this._generateLobbyId();
        this.host = host;
        this.participants = [];
        this.gameSession = null;
    }

    _generateLobbyId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 4; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
}

export default GameLobby;