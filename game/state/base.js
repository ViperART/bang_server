class BaseState {
    constructor(gameSession, card) {
        this.deck = gameSession.deck;
        this.initiator = gameSession.currentPlayer;
        this.announcer = gameSession.announcer;
        this.gameSession = gameSession;
        this.isEnd = false;
        this.cardsOnTable = [card];
        this.currentPlayer = null;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    hasEnded() {
        return this.isEnd;
    }

    getCardsOnTable() {
        return this.cardsOnTable;
    }

    _close() {
        this.isEnd = true;
        this.currentPlayer = this.initiator;
    }

    getView() {
        return {
            isEnd: this.hasEnded(),
            cards: this.getCardsOnTable()
        }
    }
}

export default BaseState;