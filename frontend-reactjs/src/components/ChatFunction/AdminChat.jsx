import React, { useState, useRef } from "react";
import Stomp from "stompjs";

const AdminChat = () => {
  const [receiver, setReceiver] = useState(""); 
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const jwtToken = {}; 
  const username = "Admin";  // Hardcoded username

  // Connect to WebSocket
  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      { Authorization: `Bearer ${jwtToken}` },
      onConnected,
      onError
    );
  };

  // Handle successful connection
  const onConnected = () => {
    setConnected(true);
    stompClient.current.subscribe(
      `/user/${username}/root`, // Subscribe address for private messages
      onPrivateMessageReceived
    );
  };

  // Handle receiving private message
  const onPrivateMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: payloadData.senderName, text: payloadData.message },
    ]);
  };

  // Send private message
  const sendPrivateMessage = () => {
    if (message && receiver && stompClient.current) {
      const chatMessage = {
        senderName: username,
        receiverName: receiver,
        message,
      };
      stompClient.current.send(
        "/app/private-message", // Send message address to server
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

  // Handle connection error
  const onError = (error) => {
    console.error("Unable to connect to WebSocket server:", error);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Connection Section */}
      {!connected ? (
        <div className="w-full flex justify-center items-center bg-gray-800 p-4">
          <div className="w-full max-w-sm">
            <button
              onClick={connect}
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Connect
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gray-900 p-4 flex flex-col justify-between flex-1">
          {/* Display Messages */}
          <div className="flex-1 overflow-y-auto mt-4 mb-4">
            <div className="text-center text-gray-400">Today</div>
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-4 ${
                    msg.sender === username ? "justify-end" : ""
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === username ? "bg-blue-600" : "bg-gray-800"
                    } p-2 rounded`}
                  >
                    <div className="text-white">{msg.sender}: {msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input and Send Message */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button
              onClick={sendPrivateMessage}
              className="ml-2 p-2 bg-blue-600 rounded"
            >
              <i className="fas fa-paper-plane text-white"></i>
            </button>
          </div>

          {/* Enter Receiver's Information */}
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Enter receiver's name"
            className="p-2 bg-gray-700 text-white rounded mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default AdminChat;
