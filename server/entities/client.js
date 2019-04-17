class Client {
    constructor(nickname, websocket) {
        this.nickname = nickname;
        this.websocket = websocket;
    }

    getId(id) {
        return this.websocket.id;
    }

    setId(id) {
        this.websocket.id = id;
    }

    getNickname() {
        return this.nickname;
    }

    getSocket() {
        return this.websocket;
    }
}

export default Client;