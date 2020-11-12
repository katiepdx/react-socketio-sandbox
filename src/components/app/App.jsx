/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
// import socket io 
import io from 'socket.io-client';

export default function App() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState('');
  const [question, setQuestion] = useState({});

  const addMessage = data => {
    console.log(data, 'add message in app.jsx');
    setMessages(messages => [...messages, data]);
    console.log(messages, 'messages in state');
  };

  const question1 = {
    text: 'Find the Chinese number 5',
    imageUrl: null,
    type: 'trueFalse',
    teacherId: 1,
    quizId: 4,
    category: ['language'],
    answers: [
      {
        text: '五',
        isCorrect: true,
        imageUrl: null
      },
      {
        text: '六',
        isCorrect: false,
        imageUrl: null
      }
    ],
    timer: 0
  };

  const question2 = {
    text: 'Find the Chinese number 6',
    imageUrl: null,
    type: 'trueFalse',
    teacherId: 1,
    quizId: 4,
    category: ['language'],
    answers: [
      {
        text: '五',
        isCorrect: false,
        imageUrl: null
      },
      {
        text: '六',
        isCorrect: true,
        imageUrl: null
      }
    ],
    timer: 0
  };
  
  useEffect(() => {
    const socket = io('localhost:7890');
    setSocket(socket);

    socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });
  
    socket.on('connectToRoom', (data) => {
      setRoom(data);
    });

    socket.on('RECEIVE_QUESTION', (data) => {
      setQuestion(data);
    });
  }, []);

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

  const handleRoom = ({ target }) => {
    socket.emit('ROOM', target.value);
  };

  const handleQuestion = ({ target }) => {
    if(target.value === 'question1') {
      socket.emit('SEND_QUESTION', question1);
    } else if(target.value === 'question2') {
      socket.emit('SEND_QUESTION', question2);
    }
  };

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

      <button onClick={handleRoom} value="room-1">Room 1</button>
      <button onClick={handleRoom} value="room-2">Room 2</button>

      <button onClick={handleQuestion} value="question1">Ask Question 1</button>
      <button onClick={handleQuestion} value="question2">Ask Question 2</button>

      <div>
        Your question, sir.
        {question.text}
      </div>
    </div>
  );
}
