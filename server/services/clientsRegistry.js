class ClientsRegistry {
    
    constructor(app) {
        this.app = app;
        this.clients = [];
    }

    add(client) {
        client.setId(this.app.get('idGenerator').generate());
        this.clients.push(client);
    }

    find(ws) {
        for (let i in this.clients) {
            if (this.clients.hasOwnProperty(i)) {
                if (ws.id === this.clients[i].getId()) {
                    return this.clients[i];
                }
            }
        }

        return null;
    }

    remove(leftClient) {
        this.clients = this.clients.filter((client) => client !== leftClient);
    }
}

export default ClientsRegistry;