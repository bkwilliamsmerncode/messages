import { Server } from 'socket.io';

const messages = {};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket_io",
      cors: {
        origin: '*',
      },
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('join', ({ userId }) => {
        socket.join(userId);
        socket.emit('previousMessages', messages[userId] || []);
      });

      socket.on('sendMessage', ({ userId, message }) => {
        if (!messages[userId]) {
          messages[userId] = [];
        }
        messages[userId].push(message);
        io.to(userId).emit('receiveMessage', message);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    console.log('Socket.io server started');
  } else {
    console.log('Socket.io server already running');
  }
  res.end();
}