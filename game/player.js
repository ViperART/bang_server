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
        this.buffs = [];
        this.role = null;

        this.maxHP = 0;
    }

    getId() {
        return this.getClient().getId()
    }

    getClient() {
        return this.client;
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

    getHero() {
        return this.hero;
    }

    getWeapon() {
        return this.weapon;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    getCards() {
        return this.cards;
    }

    getRole() {
        return this.role
    }

    getBuffs() {
        return this.buffs;
    }

    addBuff(buff) {
        this.buffs.push(buff);
    }

    getNickname() {
        return this.client.getNickname();
    }

    isSheriff() {
        return this.role === PlayerRole.SHERIFF;
    }

    isMe(client) {
        return this.client === client;
    }

    setHealthPoints(hp) {
        this.hp = hp;
    }

    getHealthPoints() {
        return this.hp;
    }

    setCards(cards) {
        this.cards = cards;
    }

    addCard(card) {
        this.cards.push(card);
    }

    getCard(cardIndex) {
        if (!this.cards[cardIndex]) {
            return false;
        }

        return this.cards[cardIndex];
    }

    takeCard(cardIndex) {
        if (!this.cards[cardIndex]) {
            return false;
        }

        return this.cards.splice(cardIndex, 1);
    }
}

export default Player;
