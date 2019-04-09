import LobbyController from "./controller/lobbyController";
import GameController from "./controller/gameController";

class Router {
    
    constructor(app) {
        this.app = app;
        this.game = new GameController(app);
        this.lobby = new LobbyController(app);
        
    }

    handle(message, client) {
        let payload = message.type.split('.');

        if (
            payload.length === 0
            || !this._isControllerExists(payload[0])
            || !this._isControllerMethodExists(payload[0], payload[1])
        ) {
            return false;
        }

        return this[payload[0]][payload[1]](message.params, client);
    }

    _isControllerExists(controller) {
        return this[controller] !== undefined;
    }

    _isControllerMethodExists(controller, method) {
        return this[controller][method] !== undefined;
    }
}

export default Router;

