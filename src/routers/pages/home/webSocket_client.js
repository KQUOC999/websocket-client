import React, { useEffect, useState, useRef } from 'react';


const WebSocketClient = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://192.168.4.1/ws'); // Update with your ESP32 WebSocket server address

    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket Server');
    };

    socketRef.current.onmessage = (event) => {
      console.log('Received message: ', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && input) {
      socketRef.current.send(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>WebSocket Client</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage} aria-label="Send Message">Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WebSocketClient;
