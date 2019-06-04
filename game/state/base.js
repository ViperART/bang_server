export const StateType = {
    BANG: 0,
    DUEL: 1,
    GATLING: 2,
    INDIANS: 3,
    SHOP: 4
};

class BaseState {
    constructor(gameSession, card, stateType) {
        this.deck = gameSession.deck;
        this.initiator = gameSession.currentPlayer;
        this.announcer = gameSession.announcer;
        this.gameSession = gameSession;
        this.isEnd = false;
        this.cardsOnTable = [card];
        this.currentPlayer = null;
        this.stateType = stateType;
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

    getStateType() {
        return this.stateType;
    }

    _close() {
        this.isEnd = true;
        this.currentPlayer = this.initiator;
    }

    getView() {
        return {
            type: this.getStateType(),
            isEnd: this.hasEnded(),
            cards: this.getCardsOnTable()
        }
    }
}

export default BaseState;