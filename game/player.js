import Weapon from "./weapons/weapon";
import { CardSuit, CardRank } from "./card";

export const PlayerRole = {
    SHERIFF: 0,
    DEPUTY: 1,
    RENEGADE: 2,
    OUTLAW: 3
}

class Player {
    
    constructor() {
        this.hp = 0;
        this.hero = {}; // TODO: need hero!
        this.cards = [];
        this.weapon = new Weapon('Colt .45', CardSuit.CLUBS, CardRank.ACE, 1);
        this.role = null
    }
}

export default Player;
