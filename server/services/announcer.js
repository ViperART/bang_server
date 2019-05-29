import {Colors} from "../../game/player";

class Announcer {
    constructor(app) {
        this.app = app;
        this.announces = []; // {announce: announce, clients: clients}
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

        this.announces.push({
            announce: {
                text: message,
                fromPlayer: {
                    id: from.getId(),
                    nickname: from.getNickname(),
                    color: from.getColor()
                },
                to: toObject
            },
            clients: clients
        });
    }

    call() {
        if (this.announces.length > 0) {
            this.announces.forEach((announceItem) => {
                this.app.get('sender').sendForeach('game', 'announce', (recipient) => {
                    return announceItem.announce;
                }, announceItem.clients);
            });

            this.announces = [];
        }
    }
}

export default Announcer;