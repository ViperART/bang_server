import {BuffType} from "../cards/buff";
import BaseState, {StateType} from "./base";

class ShopState extends BaseState {
    constructor(gameSession, card) {
        super(gameSession, card, StateType.SHOP);
        this.currentPlayer = this.gameSession.currentPlayer;
        this.cardsOnTable.push(...this.gameSession.deck.takeMany(this.gameSession.players.getAlivePlayers().length));
    }

    update(cardIndex) {
        cardIndex++; // +1 к индексу карт, так как не учитывается первая (сыгранная)

        if (!this.cardsOnTable[cardIndex]) {
            throw `Карта ${cardIndex} не найдена в магазине`
        }

        this.currentPlayer.addCard(this.cardsOnTable.splice(cardIndex, 1)[0]);
        this.announcer.announce('Выбираю эту!', this.currentPlayer, this.gameSession.getClients());

        this.currentPlayer = this.gameSession._getNextPlayer();

        if (this.isInitiator(this.currentPlayer)) {
            this._close();
        }
    }

    isInitiator(player) {
        return player === this.initiator;
    }
}

export default ShopState;