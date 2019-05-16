import RouterResponse from "../routerResponse";
import Client from './../entities/client';

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
            return new RouterResponse(false, 'В лобби нет четырех игроков, или не все игроки готовы начать игру')
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

    gameBotDebug(params, client) {
        let clients = [
            client,
            new Client('ViperART', {id: 'testId'}),
            new Client('dekamaru', {id: 'testId2'}),
            new Client('MarsAlex51', {id: 'testId3'}),
            // new Client('rand1', {id: 'testId4'}),
            // new Client('rand2', {id: 'testId5'}),
            // new Client('rand3', {id: 'testId6'})
        ];

        let gameSession = this.app.get('games').create(clients);
        this.app.get('sender').sendForeach('game', 'onStart', (recipient) => {
            return gameSession.getGameViewForClient(recipient);
        }, [client]);

        return new RouterResponse(true, {})
    }

    gameHumanDebug(params, client) {
        let clients = this.app.get('clients').findAll();
        if (clients.length !== 4) {
            return new RouterResponse(false, 'Open 4 tab in browser');
        }

        let gameSession = this.app.get('games').create(clients);
        this.app.get('sender').sendForeach('game', 'onStart', (recipient) => {
            return gameSession.getGameViewForClient(recipient);
        }, clients);

        return new RouterResponse(true, {})
    }
}

export default LobbyController;