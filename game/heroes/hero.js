class Hero {

    constructor(name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
    }

    getHealthPoints() {
        return this.hp;
    }
}

export default Hero;