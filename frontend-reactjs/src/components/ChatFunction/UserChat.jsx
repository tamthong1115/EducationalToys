import React, { useState, useRef } from "react";
import Stomp from "stompjs";

const UserChat = () => {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("Admin");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const jwtToken = {}; 

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button to open/close chatbox */}
      <button
        onClick={toggleChatBox}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg z-50 transition duration-250 ease-linear focus:outline-none"
      >
        {isOpen ? (
          <span className="text-white text-2xl">X</span>
        ) : (
          <span className="text-white text-2xl">💬</span>
        )}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[32%] max-h-[70vh] bg-white shadow-lg rounded-lg flex flex-col z-50">
          {/* Connection section */}
          {!connected && (
            <div className="flex flex-col p-4 mb-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
              <button
                onClick={handleRegister}
                className="mt-2 bg-blue-500 text-white rounded p-2 w-full"
              >
                Connect
              </button>
            </div>
          )}

          {/* Chat section */}
          {connected && (
            <div className="flex flex-col p-4 h-full ">
              <div className="border border-gray-300 flex-grow p-2 overflow-y-auto mb-4 h-[60vh]">
                <ul className="list-none p-0">
                  {messages.map((msg, index) => (
                    <li
                      key={index}
                      className={`my-1 ${
                        msg.sender === username ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="font-bold mr-1">{msg.sender}</span>:
                      <span className="ml-1">{msg.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Receiver's name"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  className="border border-gray-300 rounded p-2 flex-grow"
                />
                <input
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 rounded p-2 flex-grow"
                />
                <button
                  onClick={sendPrivateMessage}
                  className="bg-blue-500 text-white rounded p-2"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserChat;