export const PlayerRole = {
    SHERIFF: 0,
    DEPUTY: 1,
    RENEGADE: 2,
    OUTLAW: 3
};

class Player {
    
    constructor(client) {
        this.client = client;
        this.hp = 0;
        this.hero = {};
        this.cards = [];
        this.weapon = null;
        this.role = null;

        this.maxHP = 0;
    }

    setRole(role) {
        this.role = role;

        if (role === PlayerRole.SHERIFF) {
            this.maxHP++;
        }
    }

    setHero(hero) {
        this.hero = hero;
        this.maxHP += hero.getHealthPoints();
        this.setHealthPoints(this.maxHP);
    }

    setHealthPoints(hp) {
        this.hp = hp;
    }

    getHealthPoints() {
        return this.hp;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    setCards(cards) {
        this.cards = cards;
    }
}

export default Player;
