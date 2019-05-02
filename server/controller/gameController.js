import RouterResponse from "../routerResponse";

class GameController {

    constructor(app) {
        this.app = app;
    }

    throw(params, client) {
        let game = this.app.get('games').findById(params.gameId);

        if (game === null) {
            return new RouterResponse(false, 'Игра не найдена');
        }

        if (!game.isCurrentPlayer(client)) {
            return new RouterResponse(false, 'Сейчас не Ваш ход');
        }

        try {
            game.throwCard(params.cardIndex, params.receiverPlayerId);
        } catch (errorMessage) {
            return new RouterResponse(false, errorMessage);
        }

        this.app.get('sender').sendForeach('game', 'onChange', (recipient) => {
            return game.getGameViewForClient(recipient);
        }, game.getClients());

        return new RouterResponse(true, {});
    }

}

export default GameController;