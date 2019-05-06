class CardDealer {
    constructor(cards) {
        this.cards = cards;
        this.usedCards = [];
    }

    takeMany(count) {
        if (this.cards.length < count) {
            this.cards.concat(this.usedCards.shuffle());
        }

        return this.cards.splice(0, count)
    }

    takeOne() {
        if (this.cards.length === 0) {
            this.cards.concat(this.usedCards.shuffle());
        }

        return this.cards.shift();
    }

    place(card) {
        this.usedCards.push(card);
    }

    getCardsCount() {
        return this.cards.length;
    }

    getUsedCardsCount() {
        return this.usedCards.length;
    }

    discard(card) {
        this.usedCards.push(card);
    }
}


export default CardDealer;