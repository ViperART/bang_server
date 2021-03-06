import {BuffType} from "../cards/buff";
import BaseState, {StateType} from "./base";

class DuelState extends BaseState {
    constructor(gameSession, card, receiver) {
        super(gameSession, card, StateType.DUEL);
        this.receiver = receiver;
        this.currentPlayer = receiver;
    }

    update(card) {
        if (card !== null && !card.isBang()) {
            throw 'Можно ответить только картой "Бах!" или потерять жизнь'
        }

        if (card === null) {
            this.currentPlayer.loseHealthPoints(1);
            if (this.currentPlayer.getHealthPoints() <= 0) {
                this.gameSession._tryReanimateOrKillPlayer(this.currentPlayer);
            }
            this._close();
            return;
        }

        this.announcer.announce('Ну давай, покажи, чего стоишь, %player%!', this.currentPlayer, this.gameSession.getClients(), this.getNextPlayer());

        this.cardsOnTable.push(card);
        this.currentPlayer = this.getNextPlayer();
    }

    getNextPlayer() {
        return (this.currentPlayer.getId() === this.initiator.getId()) ? this.receiver : this.initiator;
    }
}

export default DuelState;