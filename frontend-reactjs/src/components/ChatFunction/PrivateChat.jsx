import React, { useState, useEffect, useRef } from "react";
import Stomp from "stompjs";

const PrivateChat = () => {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb2N0b3IxIiwicm9sZXMiOlsiUk9MRV9ET0NUT1IiXSwiZXhwIjoxNzMxMjk3NTI3LCJ1c2VySWQiOjF9.9B1lqPu2ovUNT9gnJevERrsZ0kJbr1AN5PQ9ZYTrOzs";

  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      { Authorization: `Bearer ${jwtToken}` },
      onConnected,
      onError
    );
  };

  const onConnected = () => {
    setConnected(true);
    stompClient.current.subscribe(
      `/user/${username}/root`,
      onPrivateMessageReceived
    );
  };

  const onPrivateMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: payloadData.senderName, text: payloadData.message },
    ]);
  };

  const sendPrivateMessage = () => {
    if (message && receiver && stompClient.current) {
      const chatMessage = {
        senderName: username,
        receiverName: receiver,
        message,
      };
      stompClient.current.send(
        "/app/private-message",
        { Authorization: `Bearer ${jwtToken}` },
        JSON.stringify(chatMessage)
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: username, text: message },
      ]);
      setMessage("");
    }
  };

  const onError = (error) => {
    console.error("Could not connect to WebSocket server:", error);
  };

  const handleRegister = () => {
    if (username) connect();
  };

  return (
    <div className="container" style={containerStyle}>
      {!connected ? (
        <div className="register" style={connected ? { display: "none" } : {}}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleRegister}>Connect</button>
        </div>
      ) : (
        <div className="chat-box">
          <div className="chat-content" style={chatContentStyle}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  style={{
                    margin: "5px 0",
                    textAlign: msg.sender === username ? "right" : "left",
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    {msg.sender}
                  </span>
                  : {msg.text}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              placeholder="Receiver's name"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendPrivateMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: "400px",
  margin: "auto",
  fontFamily: "Arial, sans-serif",
};

const chatContentStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  height: "300px",
  overflowY: "auto",
};

export default PrivateChat;
