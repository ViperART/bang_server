class CardDealer {
    constructor(cards) {
        this.cards = cards;
        this.usedCards = [];
    }

    take(count) {
        if (this.cards.length < count) {
            this.cards.concat(this.usedCards.shuffle());
        }

        return this.cards.splice(0, count)
    }

    place(card) {
        this.usedCards.push(card);
    }
}

export default CardDealer;