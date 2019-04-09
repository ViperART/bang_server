class ClientsRegistry {
    
    constructor(app) {
        this.app = app;
        this.clients = {};
    }

    add(client) {
        client.ws.id = this.app.get('idGenerator').generate()
        this.clients[client.ws.id] = client;
    }

    find(ws) {
        if (!this.clients[ws.id]) {
            return null;
        }

        return this.clients[ws.id];
    }
}

export default ClientsRegistry;