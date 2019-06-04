import {BuffType} from "../cards/buff";
import BaseState, {StateType} from "./base";

class GatlingState extends BaseState {
    constructor(gameSession, card) {
        super(gameSession, card, StateType.GATLING);
        this.currentPlayer = this.gameSession._getNextPlayer();
        this.checkBarrel(this.currentPlayer);
    }

    update(card) {
        if (card !== null && !card.isMiss()) {
            throw 'Можно ответить только картой Мимо или потерять жизнь'
        }

        if (card === null) {
            this.currentPlayer.loseHealthPoints(1);
            if (this.currentPlayer.getHealthPoints() <= 0) {
                this.gameSession._tryReanimateOrKillPlayer(this.currentPlayer);
            }
            this.currentPlayer = this.gameSession._getNextPlayer();
            if (this.isInitiator(this.currentPlayer)) {
                this._close();
            } else {
                this.checkBarrel(this.currentPlayer);
            }

            return;
        }

        this.announcer.announce('Ствол большой, а пользоваться не умеешь!', this.currentPlayer, this.gameSession.getClients());

        this.cardsOnTable.push(card);
        this.deck.discard(this.currentPlayer.takeCard(this.currentPlayer.getCardIndex(card)));

        this.currentPlayer = this.gameSession._getNextPlayer();
        if (this.isInitiator(this.currentPlayer)) {
            this._close();
        } else {
            this.checkBarrel(this.currentPlayer);
        }
    }

    checkBarrel(player) {
        if (player.hasBuff(BuffType.BARREL)) {
            let checkCard = this.deck.takeOne();
            if (checkCard.isHearts()) {
                this.announcer.announce('О, не зря бочку нацепил!', this.currentPlayer, this.gameSession.getClients());
                this.currentPlayer = this.gameSession._getNextPlayer();
                if (this.isInitiator(this.currentPlayer)) {
                    this._close();
                    return;
                }
            } else {
                this.announcer.announce('Ну и на кой черт я вообще сижу в этой бочке?', this.currentPlayer, this.gameSession.getClients());
            }

            this.deck.discard(checkCard)
        }
    }

    isInitiator(player) {
        return player === this.initiator;
    }
}

export default GatlingState;