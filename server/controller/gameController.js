import RouterResponse from "../routerResponse";

class GameController {

    constructor(app) {
        this.app = app;
    }

    throw(params, client) {
        return this._handleGameAction(params, client, (game) => {
            game.throwCard(params.cardIndex, params.receiverPlayerId);
        });
    }

    throwCardToDiscard(params, client) {
        return this._handleGameAction(params, client, (game) => {
            game.discardCard(params.cardIndex, params.receiverPlayerId);
        });
    }



    skip(params, client) {
        return this._handleGameAction(params, client, (game) => {
            game.skip();
        });
    }

    turnEnd(params, client) {

        return this._handleGameAction(params, client, (game) => {
            game.turnEnd();
        });
    }


    _handleGameAction(params, client, callback) {
        let game = this.app.get('games').findById(params.gameId);

        if (game === null) {
            return new RouterResponse(false, 'Игра не найдена');
        }

        if (!game.isCurrentPlayer(client)) {
            return new RouterResponse(false, 'Сейчас не Ваш ход');
        }

        if (!params.receiverPlayerId) {
            params.receiverPlayerId = null;
        }

        try {
            callback(game);
        } catch (errorMessage) {
            return new RouterResponse(false, errorMessage);
        }

        this.app.get('sender').sendForeach('game', 'onChange', (recipient) => {
            return game.getGameViewForClient(recipient);
        }, game.getClients());

        this.app.get('announcer').call();

        return new RouterResponse(true, {});
    }
}

export default GameController;