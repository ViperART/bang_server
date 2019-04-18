import LobbyController from "./controller/lobbyController";
import RouterResponse from "./routerResponse";
import GameController from "./controller/gameController";

class Router {
    
    constructor(app) {
        this.app = app;
        this.lobby = new LobbyController(app);
        this.game = new GameController(app);
        
    }

    handle(message, client) {
        let payload = message.type.split('.');

        if (payload.length === 0 || !this._isControllerMethodExists(payload[0], payload[1])) {
            return new RouterResponse(false, 'Bad payload or method not found');
        }

        return this[payload[0]][payload[1]](message.params, client);
    }

    _isControllerMethodExists(controller, method) {
        return this[controller] !== undefined && this[controller][method] !== undefined;
    }
}

export default Router;

