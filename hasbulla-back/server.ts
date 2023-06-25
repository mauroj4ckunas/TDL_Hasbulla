import express, { Request, Response } from 'express';
import { SocketManager } from './utils/SocketManager'

const app = express();
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
//const io = new SocketIOServer(server);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req: Request, res: Response) => {
  console.log(req.body)
  const { username } = req.body

  if(username)
    res.status(200).json({ redirectUrl: '/live-chat' })
  else 
    res.status(400).json({message: 'login incorrecto'})
});

app.get('/live-chat', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/views/live_chat.html');
});

const socketManager = SocketManager.getInstance(server)

/* io.on('connection', (socket: Socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('chat message', (message: string, sender: string) => {
    console.log('Mensaje recibido:', message, sender);
    const msg = new Message(message, sender);
    io.emit('chat message', msg.getTextMessage(), msg.getSender());
    // io.to(chatRoom).emit('chat message', msg.getTextMessage());
  });

  socket.on('join chat', (chatRoom: string) => {
    console.log('join chat:', chatRoom)
    // socket.join(chatRoom)
    // Emitir evento de redireccionamiento al cliente
    socket.emit('redirect', '/live-chat');
  })

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
}); */
