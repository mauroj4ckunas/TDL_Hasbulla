import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketManager {
  private static instance: SocketManager;
  private io: SocketIOServer;

  private constructor(server: any) {
    this.io = new SocketIOServer(server);
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
      socket.on('chat message', (message: string, sender: string) => {
        this.handleChatMessage(socket, message, sender);
      });

      socket.on('join chat', (chatRoom: string) =>{
        this.handleJoinChat(chatRoom)
      })

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

  private handleConnection(socket: Socket) {
    // Lógica para el evento de conexión
    console.log('Cliente conectado')
  }

  private handleChatMessage(socket: Socket, message: string, sender: string) {
    // Lógica para el evento de chat message
    console.log('Mensaje recibido:', message, sender);
    //const msg = new Message(message, sender);
    this.io.emit('chat message', message, sender);
  }

  private handleDisconnect(socket: Socket) {
    // Lógica para el evento de desconexión
    console.log('Cliente desconectado')
  }

  private handleJoinChat(chatRoom: string){
    console.log('redirecting to user: ', chatRoom)
    this.io.emit('redirect', '/live-chat');
  }

  // Otros métodos y lógica de manejo de sockets adicionales
  // ...
}
