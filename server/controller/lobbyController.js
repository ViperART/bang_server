import RouterResponse from "../routerResponse";

class LobbyController {

    constructor(app) {
        this.app = app;
    }

    create(params, client) {
        let createdLobby = this.app.get('lobbies').create(client);
        return new RouterResponse(true, createdLobby.getPlayers())
    }

    list(params, client) {
        return new RouterResponse(true, this.app.get('lobbies').findAll())
    }

    join(params, client) {
        if (!params.id) {
            return new RouterResponse(false, 'Bad message received');
        }

        let lobby = this.app.get('lobbies').findById(params.id);

        if (null === lobby) { 
            return new RouterResponse(false, 'Lobby not found');
        }

        lobby.join(client)
        this._notifyLobbyAboutJoinedPlayer(lobby, client)

        return new RouterResponse(true, lobby.getPlayers())
    }

    _notifyLobbyAboutJoinedPlayer(lobby, client) {
        //this.app.get('sender').sendTo()
    }
}

export default LobbyController;