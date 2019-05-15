class BangState {
    constructor(deck, initiator, receiver, bangCard) {
        this.deck = deck;
        this.initiator = initiator;
        this.receiver = receiver;

        this.currentPlayer = receiver;
        this.isEnd = false;
        this.cardsOnTable = [bangCard];
    }

    update(card) {
        // эта функция вызовется в первый раз когда будет отвечать receiver, в аргументах лежит карта которой он отвечает или null если игрок отказался отвечать
        if (card !== null && !card.isMiss()) {
            throw 'Можно ответить только картой Мимо или потерять жизнь'
        }

        if (card === null) {
            this.receiver.loseHealthPoints(1);
            this._close();
            return
        }

        this.cardsOnTable.push(card);
        this.deck.discard(this.currentPlayer.takeCard(this.currentPlayer.getCardIndex(card)));
        this._close();
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

export default BangState;