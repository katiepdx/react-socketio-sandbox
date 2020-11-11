// server
const express = require('express');
const app = express();


server = app.listen(7890, () => {
  console.log('server is running');
});

// bring in socketio
const socket = require('socket.io');
io = socket(server);

// socket connection 
io.on('connection', (socket) => {
  console.log(socket.id, 'SOCKET ID');
  // console.log(socket, 'SOCKET')

  //SEND_MESSAGE event received
  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
    console.log(`${data.author} joined the chat`);
  });
});
