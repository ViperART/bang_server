import RouterResponse from "../routerResponse";

class LobbyController {

    constructor(app) {
        this.app = app;
    }

    create(params, client) {
        let createdLobby = this.app.get('lobbies').create(client);
        return new RouterResponse(true, {id: createdLobby.getId(), clients: createdLobby.getClientsView()})
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

        lobby.join(client);
        this.app.get('sender').sendTo('lobby', 'onClientJoin', lobby.getClientsView(), lobby.getClients());

        return new RouterResponse(true, {});
    }

    leave(params, client) {
        let lobby = this.app.get('lobbies').findById(params.id);

        if (null === lobby) {
            return new RouterResponse(false, 'Lobby not found');
        }

        lobby.leave(client);

        if (lobby.getClientsCount() === 0) {
            this.app.get('lobbies').remove(lobby.getId());
        } else {
            this.app.get('sender').sendTo('lobby', 'onClientLeft', lobby.getClientsView(), lobby.getClients());
        }

        return new RouterResponse(true, {});
    }
}

export default LobbyController;