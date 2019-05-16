import { Server } from 'ws';
import Router from './server/router';
import IdGenerator from './server/services/idGenerator';
import ApplicationContainer from './server/container';
import ClientsRegistry from './server/services/clientsRegistry';
import LobbyRegistry from './server/services/lobbyRegistry';
import Sender from './server/services/sender';
import Client from './server/entities/client';
import GameRegistry from "./server/services/gameRegistry";
import Announcer from "./server/services/announcer";

const wss = new Server({
    port: 8080
});
const app = new ApplicationContainer();

app.add('router', new Router(app));
app.add('lobbies', new LobbyRegistry(app));
app.add('games', new GameRegistry(app));
app.add('clients', new ClientsRegistry(app));
app.add('idGenerator', new IdGenerator(app));
app.add('sender', new Sender(app));
app.add('announcer', new Announcer(app));


wss.on('connection', function (ws, request) {

    let connectedNickname = getUsernameFromRequest(request);
    if (!connectedNickname) {
        ws.send('Nickname is empty');
        ws.close();
    }

    app.get('clients').add(new Client(connectedNickname, ws));

    ws.on('message', function (message) {
        let client = app.get('clients').find(ws);

        try {
            message = JSON.parse(message);
        } catch (e) {
            sendError(ws, 'Wrong JSON');
            return;
        }

        if (!message.type || !message.params) {
            sendError(ws, 'Wrong message');
            return;
        }

        let routerResponse = app.get('router').handle(message, client);

        if (routerResponse.isError()) {
            sendError(ws, routerResponse.getResponse());
            return;
        }

        ws.send(JSON.stringify({
            success: true,
            type: message.type,
            response: routerResponse.getResponse()
        }))
    });

    ws.on('close', function () {
        let client = app.get('clients').find(ws);
        app.get('clients').remove(client);
        app.get('lobbies').removeClientFromAllLobbies(client)
    });
});

function sendError(ws, message) {
    ws.send(JSON.stringify({
        success: false,
        error: message
    }));
}

function getUsernameFromRequest(request) {
    return findGetParameter(request.url, 'username');
}

function findGetParameter(urlString, parameterName) {
    var result = null,
        tmp = [];
    urlString
        .substr(2)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}