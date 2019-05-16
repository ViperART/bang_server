import {Colors} from "../../game/player";

class Announcer {
    constructor(app) {
        this.app = app;
        this.lastAnnounce = null;
        this.lastAnnounceClients = null;
    }

    announce(message, from, clients, to = null) {
        // message example: {Ты сгниешь в аду, @red{ViperART}}
        let toObject = null;
        if (to !== null) {
            toObject = {
                id: to.getId(),
                nickname: to.getNickname(),
                color: to.getColor()
            };

            message = message.replace('%player%', `@${toObject.color}{${toObject.nickname}}`)
        }

        this.lastAnnounce = {
            text: message,
            fromPlayer: {
                id: from.getId(),
                nickname: from.getNickname(),
                color: from.getColor()
            },
            to: toObject,
        };

        this.lastAnnounceClients = clients;
    }

    call() {
        if (this.lastAnnounce !== null) {
            this.app.get('sender').sendForeach('game', 'announce', (recipient) => {
                return this.lastAnnounce;
            }, this.lastAnnounceClients);

            this.lastAnnounce = null;
        }
    }
}

export default Announcer;