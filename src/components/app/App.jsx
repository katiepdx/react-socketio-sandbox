import React from 'react';
// import socket io 
import io from "socket.io-client";

export default function App() {

  const socket = io('localhost:7890');

  console.log('in app jsx')

  return (
    <h1>hi {JSON.stringify(socket)}</h1>
  )
}
