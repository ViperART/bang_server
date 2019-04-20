import Card from "./card";
import {CardType} from "../data/cards";
 
class Weapon extends Card {
    constructor(name, suit, rank, range) {
        super(name, suit, rank, CardType.WEAPON);
        this.range = range;
    }
}

export default Weapon;