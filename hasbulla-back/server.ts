import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { userConnectionController } from './controllers/userConnectionController';
import { FirebaseDB } from './models/BDconfig/FirebaseDB';
import { DB } from './models/BDconfig/DB';
import { UserModel } from './models/UserModel';
import { resolve } from 'path';


const port = 5000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {origin: `http://localhost:3000`}
})

const userConnection = new userConnectionController();
const db: DB = new FirebaseDB();

io.on("connection", (socket) => {
  
  console.log('Cliente conectado');
  socket.join('chat');

  socket.on("handle-connection", async (username: string, password: string) => {
    let connection = await handleConnection(username, password);
    if (connection) {
      socket.emit("username-refuse");
    } else {
      socket.emit("username-success");
      io.emit("get-connected-users", userConnection.getUsers());
    }
  });

  socket.on("disconnect", (username: string) => {
    handleDisconnection(username);
  });

});

const obtainUser = (username: string): Promise<UserModel | null> => {
  return new Promise((reject, refuse) => {
    db.getUser(username).then(user => {
      reject(user);
    }).catch(error => refuse(error))
  })
}

const handleDisconnection = async (username: string) => {
  const userDisconnect = await obtainUser(username);
  if (userDisconnect !== null) {
    userConnection.desconnectUser(userDisconnect);
  }
}

const handleConnection = async (username: string, password: string): Promise<boolean> => {
  const posibleUser = await obtainUser(username);
  return new Promise((resolve, reject) => {
    let connect: boolean;
    if (posibleUser !== null) {
      connect = userConnection.connectUser(posibleUser, password);
    } else {
      connect = false;
    }
    resolve(connect);
  });
}

server.listen(port, () => console.log(`Servidor en funcionamiento en http://localhost:${port}`))
