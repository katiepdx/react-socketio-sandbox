import React, { useState } from 'react';
// import socket io 
import io from 'socket.io-client';

export default function App() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = io('localhost:7890');

  console.log('in app jsx');

  const handleMessage = ({ target }) => {
    setMessage(target.value);
  };
  const handleUserName = ({ target }) => {
    setUserName(target.value);
  };

  const handleClick = () => {
    socket.emit('SEND_MESSAGE', {
      author: userName,
      message
    });
    setMessage('');
  };

  return (
    <div>
      <input onChange={handleUserName} type="text" placeholder="Username" />
      <br/>
      <input onChange={handleMessage} type="text" placeholder="Message" />
      <br/>
      <button onClick={handleClick}>Send</button>
    </div>
  );
}
