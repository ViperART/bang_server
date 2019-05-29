import {BuffType} from "../cards/buff";
import BaseState from "./base";

class IndiansState extends BaseState {
    constructor(gameSession, card) {
        super(gameSession, card);
        this.currentPlayer = this.gameSession._getNextPlayer();
    }

    update(card) {
        if (card !== null && !card.isBang()) {
            throw 'Можно ответить только картой "Бах!" или потерять жизнь'
        }

        if (card === null) {
            this.currentPlayer.loseHealthPoints(1);
            this.currentPlayer = this.gameSession._getNextPlayer();
            if (this.isInitiator(this.currentPlayer)) {
                this._close();
            }

            return;
        }

        this.announcer.announce('Черт с вами, забирайте.', this.currentPlayer, this.gameSession.getClients());

        this.cardsOnTable.push(card);
        this.deck.discard(this.currentPlayer.takeCard(this.currentPlayer.getCardIndex(card)));

        this.currentPlayer = this.gameSession._getNextPlayer();
        if (this.isInitiator(this.currentPlayer)) {
            this._close();
        }
    }

    isInitiator(player) {
        return player === this.initiator;
    }
}

export default IndiansState;