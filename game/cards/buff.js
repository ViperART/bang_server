import Card from "./card";
import {CardType} from "../data/cards";

export const BuffType = {
    JAIL: 0,
    DYNAMITE: 1,
    SCOPE: 2,
    MUSTANG: 3,
    BARREL: 4
};

class Buff extends Card {
    constructor(name, suit, rank, buffType) {
        super(name, suit, rank, CardType.BUFF);
        this.buffType = buffType;
    }

    isJail() {
        return this.buffType === BuffType.JAIL;
    }

    isMustang() {
        return this.buffType === BuffType.MUSTANG;
    }

    isScope() {
        return this.buffType === BuffType.SCOPE;
    }
}

export default Buff;