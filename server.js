import { Server } from 'ws';
import Router from './server/router';
import IdGenerator from './server/services/idGenerator';
import ApplicationContainer from './server/container';
import ClientsRegistry from './server/services/clientsRegistry';
import LobbyRegistry from './server/services/lobbyRegistry';

const wss = new Server({ port: 8080 });
const app = new ApplicationContainer();

app.add('router', new Router(app));
app.add('lobbies', new LobbyRegistry(app));
app.add('clients', new ClientsRegistry(app));
app.add('idGenerator', new IdGenerator(app));

wss.on('connection', function (ws, request) {
  
  let connectedNickname = getUsernameFromRequest(request);
  if (!connectedNickname) {
    ws.send('Nickname is empty')
    ws.close();
  }

  app.get('clients').add({nickname: getUsernameFromRequest(request), ws: ws});

  ws.on('message', function (message) {
    let client = app.get('clients').find(ws);

    try {
      message = JSON.parse(message);
    } catch(e) {
      ws.send('Wrong JSON');
      return;
    }

    if (!message.type || !message.params) {
      ws.send('Wrong command');
      return;
    }

    let routerResponse = app.get('router').handle(message, client);
    if (!routerResponse) {
      ws.send('404');
      return;
    }

    ws.send(JSON.stringify({response: routerResponse}))
  });
  
});

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

