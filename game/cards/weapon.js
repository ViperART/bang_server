import Card from "./card";
import {CardType} from "../data/cards";

export const DEFAULT_WEAPON_NAME = 'Кольт .45';
 
class Weapon extends Card {
    constructor(name, suit, rank, weaponRange) {
        super(name, suit, rank, CardType.WEAPON);
        this.range = weaponRange;
    }

    static createDefaultWeapon() {
        return new Weapon(DEFAULT_WEAPON_NAME, 1, 1, 1);
    }

    isDefault() {
        return this.name === DEFAULT_WEAPON_NAME;
    }

    getRange() {
        return this.range;
    }
}

export default Weapon;