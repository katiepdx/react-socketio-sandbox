/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
// import socket io 
import io from 'socket.io-client';

export default function App() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState('')

  const addMessage = data => {
    console.log(data, 'add message in app.jsx');
    setMessages(messages => [...messages, data]);
    console.log(messages, 'messages in state');
  };
  
  useEffect(() => {
    const socket = io('localhost:7890');
    setSocket(socket)

    socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });
  
    socket.on('connectToRoom', (data) => {
      setRoom(data);
    });
  }, [])

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

  const messageElements = messages.map(message => {
    return (
      <div>
        {message.author}: {message.message}
      </div>
    );
  });

  return (
    <div>
      <div>{room}</div>

      <input onChange={handleUserName} type="text" placeholder="Username" />
      <br />
      <input onChange={handleMessage} type="text" placeholder="Message" />
      <br />

      <button onClick={handleClick}>Send</button>

      <div>
        {messageElements}
      </div>
    </div>
  );
}
