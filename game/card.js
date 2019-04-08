export const CardSuit = {
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3
}

export const CardRank = {
    ACE: 'A',
    KING: 'K',
    QUEEN: 'Q',
    JACK: 'J'
}

export const CardType = {
    ACTION: 0,
    BUFF: 1,
    WEAPON: 2
}

class Card {
    constructor(name, suit, rank, type, range) {
        this.name = name;
        this.suit = suit;
        this.rank = rank;
        this.type = type;
        this.range = range;
    }
}

export default Card;