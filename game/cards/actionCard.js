import Card from "./card";
import {CardType} from "../data/cards";


export const ActionCardType = {
    BANG: 0,
    MISSED: 1,
    DILIGENZA: 2,
    WELLS_FARGO: 3,
    GATLING: 4,
    SALOON: 5,
    INDIANS: 6,
    DUEL: 7,
    PANIC: 8,
    CAT_BALOU: 9,
    BEER: 10,
    SHOP: 11
};

class ActionCard extends Card {
    constructor(name, suit, rank, actionType) {
        super(name, suit, rank, CardType.ACTION);
        this.type = actionType;
    }
}

export default ActionCard;