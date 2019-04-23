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

        if (lobby.isFull()) {
            return new RouterResponse(false, 'Lobby is full');
        }

        let joinStatus = lobby.join(client);
        if (!joinStatus) {
            return new RouterResponse(false, 'Лобби заполнено или вы пытаетесь зайти в лобби в котором вы уже находитесь');
        }

        this.app.get('sender').sendTo('lobby', 'onClientJoin', lobby.getClientsView(), lobby.getClients());

        return new RouterResponse(true, {id: params.id});
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

    ready(params, client) {
        let lobby = this.app.get('lobbies').findById(params.id);

        if (null === lobby) {
            return new RouterResponse(false, 'Lobby not found');
        }

        lobby.ready(client);
        this.app.get('sender').sendTo('lobby', 'onClientReady', lobby.getClientsView(), lobby.getClients());

        return new RouterResponse(true, {});
    }

    gameStart(params, client) {
        let lobby = this.app.get('lobbies').findById(params.id);

        if (null === lobby) {
            return new RouterResponse(false, 'Lobby not found');
        }

        if (!lobby.isReadyForStart()) {
            return new RouterResponse(false, 'Не все игроки готовы начать игру')
        }

        if (!lobby.isHost(client)) {
            return new RouterResponse(false, 'Вы не хост!')
        }

        let gameSession = this.app.get('games').create(lobby.getClients());
        this.app.get('sender').sendForeach('game', 'onStart', (recipient) => {
            return gameSession.getGameViewForClient(recipient);
        }, lobby.getClients());

        return new RouterResponse(true, {})
    }
}

export default LobbyController;