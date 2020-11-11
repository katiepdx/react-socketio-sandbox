/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
// import socket io 
import io from 'socket.io-client';

export default function App() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = io('localhost:7890');

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

  const addMessage = data => {
    console.log(data, 'add message in app.jsx');
    setMessages([...messages, data]);
    console.log(messages, 'messages in state');
  };

  socket.on('RECEIVE_MESSAGE', (data) => {
    addMessage(data);
  });

  const messageElements = messages.map(message => {
    return (
      <div>
        {message.author}: {message.message}
      </div>
    );
  });

  return (
    <div>
      <input onChange={handleUserName} type="text" placeholder="Username" />
      <br/>
      <input onChange={handleMessage} type="text" placeholder="Message" />
      <br/>
      <button onClick={handleClick}>Send</button>
      <div>
        {messageElements}
      </div>
    </div>
  );
}
