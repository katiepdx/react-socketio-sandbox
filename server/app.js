/* eslint-disable max-len */
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

  //ROOMS
  const roomno = 1;
  socket.join('room-' + roomno);
  io.sockets.in('room-' + roomno).emit('connectToRoom', 'You are in room no. ' + roomno);
  //SEND_MESSAGE event received
  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
    console.log(`${data.author} joined the chat`);
  });
});
