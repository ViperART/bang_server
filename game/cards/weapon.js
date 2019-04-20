import Card from "./card";
import {CardType} from "../data/cards";
 
class Weapon extends Card {
    constructor(name, suit, rank, weaponRange) {
        super(name, suit, rank, CardType.WEAPON);
        this.range = weaponRange;
    }
}

export default Weapon;