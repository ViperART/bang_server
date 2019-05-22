export const PlayerRole = {
    SHERIFF: 0,
    DEPUTY: 1,
    RENEGADE: 2,
    OUTLAW: 3
};

export const Colors = {
    0: 'blue',
    1: 'red',
    2: 'yellow',
    3: 'green',
    4: 'purple',
    5: 'emerald',
    6: 'orange'
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
        this.color = null;

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

    getAvailableCards() {
        let cards = [...this.getCards(), ...this.getBuffs()]
        if (!this.getWeapon().isDefault()) {
            cards.push(this.getWeapon());
        }

        return cards;
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

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setHealthPoints(hp) {
        this.hp = hp;
    }

    getHealthPoints() {
        return this.hp;
    }

    getMaxHealthPoints() {
        return this.maxHP;
    }

    loseHealthPoints(amount) {
        this.hp -= amount;
    }

    addHealthPoints(amount) {
        if (this.getHealthPoints() >= this.getMaxHealthPoints()) {
            return;
        }

        this.hp += amount;
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

    getCardIndex(card) {
        return this.cards.indexOf(card);
    }

    takeCard(cardIndex) {
        if (!this.cards[cardIndex]) {
            return false;
        }

        return this.cards.splice(cardIndex, 1)[0];
    }

    takeBuff(buffType) {
        let buffCard = null;
        this.buffs.forEach(card => {
            if (card.getType() === buffType) {
                buffCard = card;
            }
        });

        if (buffCard === null) {
            return false;
        }

        this.buffs = this.buffs.filter(card => {
            return card.getType() !== buffCard.getType();
        });

        return buffCard;
    }

    hasBuff(buffType) {
        let found = false;
        this.buffs.forEach(card => {
            if (card.getType() === buffType) {
                found = true
            }
        });

        return found;
    }

    canThrowUnlimitedBangs() {
        return this.getWeapon().isVolcanic() || this.getHero().isWilly();
    }
}

export default Player;
