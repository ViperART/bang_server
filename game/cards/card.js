import {CardType} from "../data/cards";

class Card {
    constructor(name, suit, rank, type) {
        this.name = name;
        this.suit = suit;
        this.rank = rank;
        this.type = type;
    }

    getName() {
        return this.name;
    }

    equals(card) {
        return this.getName() === card.getName()
    }

    isAction() {
        return this.type === CardType.ACTION;
    }

    isBuff() {
        return this.type === CardType.BUFF;
    }

    isWeapon() {
        return this.type === CardType.WEAPON;
    }
}

export default Card;