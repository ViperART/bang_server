import {BuffType} from "../cards/buff";
import BaseState from "./base";

class BangState extends BaseState {
    constructor(gameSession, card, receiver) {
        super(gameSession, card);
        this.receiver = receiver;
        this.currentPlayer = receiver;
        this.checkBarrel();
    }

    update(card) {
        if (card !== null && !card.isMiss()) {
            throw 'Можно ответить только картой Мимо или потерять жизнь'
        }

        if (card === null) {
            this.receiver.loseHealthPoints(1);
            this._close();
            return;
        }

        this.announcer.announce('Ха, тебе бы прицел поправить, %player%!', this.currentPlayer, this.gameSession.getClients(), this.initiator);

        this.cardsOnTable.push(card);
        this.deck.discard(this.currentPlayer.takeCard(this.currentPlayer.getCardIndex(card)));
        this._close();
    }

    checkBarrel() {
        if (this.receiver.hasBuff(BuffType.BARREL)) {
            let checkCard = this.deck.takeOne();
            if (checkCard.isHearts()) {
                this.announcer.announce('О, не зря бочку нацепил!', this.currentPlayer, this.gameSession.getClients());
                this._close();
            } else {
                this.announcer.announce('Ну и на кой черт я вообще сижу в этой бочке?', this.currentPlayer, this.gameSession.getClients());
            }

            this.deck.discard(checkCard)
        }
    }
}

export default BangState;