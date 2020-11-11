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

  let room = '';
  //ROOMS
  socket.on('ROOM', (data) => {
    room = data;
    
    socket.join(room);
    io.sockets.in(room).emit('connectToRoom', `You are in ${room}`);
    // if(data === 'room-1') {
    //   socket.join('room-1');
    //   io.sockets.in('room-1').emit('connectToRoom', 'You are in room no. 1');
    // } else if(data === 'room-2') {
    //   socket.join('room-2');
    //   io.sockets.in('room-2').emit('connectToRoom', 'You are in room no. 2');
    // }
  });

  //SEND_MESSAGE event received
  // socket one person
  socket.on('SEND_MESSAGE', (data) => {
    // io emit - send to everyone
    io.sockets.in(room).emit('RECEIVE_MESSAGE', data);
    console.log(`${data.author} joined the chat`);
  });
});

// socket.broadcast - everyone but the person who sent it
// socket.emit - just connected socket 
// io.emit - everybody 
// io.to.emit - everybody in a room
