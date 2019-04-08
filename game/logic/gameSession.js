export const GameState = {

}

class GameSession {
    constructor() {
        this.id = null;



        this.players = [];
        this.cards = [];
        this.usedCards = [];

        this.state = null;
        this.currentPlayer = null;
    }


}

export default GameSession;