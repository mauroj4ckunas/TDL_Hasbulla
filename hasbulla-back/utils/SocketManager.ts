import { Server as SocketIOServer, Socket } from 'socket.io';
import { FirebaseDB } from '../models/BDconfig/FirebaseDB';
import { DB } from '../models/BDconfig/DB';
import { userConnectionController } from '../controllers/userConnectionController';
import { UserModel } from '../models/UserModel';

type Messages = {
  idMessage: number;
  text: string,
  senderUser: string,
  receiveUser: string,
  image?: string,
  coordenates?: number[],
  date: string,
}

type Users = {
  username: string,
  name: string,
  password: string,
}

export class SocketManager {
  private static instance: SocketManager;
  private io: SocketIOServer;
  private db: DB = new FirebaseDB();
  private userConnection: userConnectionController = new userConnectionController();

  private constructor(server: any) {
    this.io = new SocketIOServer(server, {cors: {
      origin: 'http://localhost:3000',
    }});
    this.setupEvents();
  }

  public static getInstance(server: any): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager(server);
    }
    return SocketManager.instance;
  }

  private setupEvents() {
    this.io.on('connection', (socket: Socket) => {
      // Evento de conexión
      this.handleConnection(socket);
      // Eventos Generales
      
      socket.on("login", (data: {username: string, password: string} | null) => {
        if (data !== null) {
          this.handleLogin(data.username, data.password, socket);
        }
      });

      socket.on('join_chat', (idChat: number) => {
        this.handleJoinChat(idChat)
      })

      socket.on('message', (message: Messages, sender: Users) => {
        this.handleChatMessage(socket, message, sender);
      });

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

private handleLogin(username: string, password: string, socket: Socket) {
    this.db.getUser(username)
      .then((user) => {
        if (user === null || user.getPassword() !== password) {
          socket.emit("connect-failed");
        } else {
          const userConnect: UserModel = new UserModel(user.getUsername(), user.getName(), user.getPassword());
          userConnect.setId(socket.id);
          this.userConnection.connectUser(userConnect, this.db);
          
          socket.emit("connect-success", {
            username: user.getUsername(),
            nombre: user.getName(),
            contrasena: user.getPassword(),
          });
        }
      })
      .catch((error) => {
        console.error("Error en el logeo de:", username, error);
        socket.emit("connect-failed");
      });
  }
  

  private handleJoinChat(idChat: number){
    // this.io.emit();
  }

  private handleConnection(socket: Socket) {
    // Lógica para el evento de conexión
    console.log('Cliente conectado')
  }

  private handleChatMessage(socket: Socket, message: Messages, sender: Users) {
    socket.emit('receive-message', message, sender);
  }

  private handleDisconnect(socket: Socket) {
    // Lógica para el evento de desconexión
    console.log('Cliente desconectado')
  }

  // Otros métodos y lógica de manejo de sockets adicionales
  // ...
}
