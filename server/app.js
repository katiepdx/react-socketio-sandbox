// server
const express = require('express')
const app = express()


server = app.listen(7890, function () {
  console.log('server is running')
})

// bring in socketio
const socket = require('socket.io')
io = socket(server)

// socket connection 
io.on('connection', (socket) => {
  console.log(socket.id, 'SOCKET ID')
  // console.log(socket, 'SOCKET')
})
