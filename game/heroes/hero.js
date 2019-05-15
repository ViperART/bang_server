import {HeroType} from "../data/heroes";

class Hero {

    constructor(name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
    }

    getHealthPoints() {
        return this.hp;
    }

    isWilly() {
        return this.type === HeroType.WILLY;
    }
}

export default Hero;