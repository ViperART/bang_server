import {Card, CardType} from "./card";
 
class Weapon extends Card {
    constructor(name, suit, rank, range) {
        super(name, suit, rank, CardType.WEAPON, range);
    }
}

export default Weapon;