class LobbyController {

    constructor(app) {
        this.app = app;
    }

    create(params, client) {
        return this.app.get('lobbies').create(client)
    }

    list(params, client) {
        return this.app.get('lobbies').findAll()
    }
}

export default LobbyController;