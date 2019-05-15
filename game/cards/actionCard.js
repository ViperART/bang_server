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
        this.actionType = actionType;
    }

    isBang() {
        return this.actionType === ActionCardType.BANG;
    }

    isMiss() {
        return this.actionType === ActionCardType.MISSED;
    }

    isDiligenza() {
        return this.actionType === ActionCardType.DILIGENZA;
    }

    isWellsFargo() {
        return this.actionType === ActionCardType.WELLS_FARGO;
    }

    isGatling() {
        return this.actionType === ActionCardType.GATLING;
    }

    isSaloon() {
        return this.actionType === ActionCardType.SALOON;
    }

    isIndians() {
        return this.actionType === ActionCardType.INDIANS;
    }

    isDuel() {
        return this.actionType === ActionCardType.DUEL;
    }

    isPanic() {
        return this.actionType === ActionCardType.PANIC;
    }

    isCatBalou() {
        return this.actionType === ActionCardType.CAT_BALOU;
    }

    isBeer() {
        return this.actionType === ActionCardType.BEER;
    }

    isShop() {
        return this.actionType === ActionCardType.SHOP;
    }
}

export default ActionCard;