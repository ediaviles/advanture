import React from 'react';
import './MessageInterface.css'; // Importing the CSS file for styling
import { useState, useEffect } from 'react';


const MessageItem = ({ name, message, imageUrl }) => {
  return (
    <div className="message-item">
      <img className="avatar" src={imageUrl} alt={`${name}`} />
      <div className="message-content">
        <div className="name">{name}</div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

const MessageInterface = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([])
  }, [])

  return (
    <div className="messages-interface">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <MessageItem key={index} name={msg.name} message={msg.message} imageUrl={msg.imageUrl} />
        ))
      ) : (
        <div className="no-messages">You have no current messages.</div>
      )}
    </div>
  );
};

export default MessageInterface;
