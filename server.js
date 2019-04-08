import { Server } from 'ws';
import GameSession from './game/logic/gameSession';

const url = require('url');
const wss = new Server({ port: 8080 });

/*
{type: MESSAGE_TYPE}
*/

const clients = [];

wss.on('connection', function (ws, request) {
  
  ws.id = generateClientId();
  clients.push({nickname: getUsernameFromRequest(request), ws: ws});

  ws.on('message', function (message) {
    // message = JSON.parse(message)
    // if (message.type === 'CREATE_GAME') {
    //   gameSessions.push(new GameSession('new id'));
    // } else {
    //   connect(gameSessions.id)
    // }

    let client = getClientById(ws.id);
    ws.send('Hello ' + client.nickname);

  });
});

function getClientById(id) {
  let foundClient = null;
  clients.forEach(function (client) {
    
    if (client.ws.id === id) {
      foundClient = client;
      return;
    }
  })

  return foundClient;
}

function generateClientId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;  
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

