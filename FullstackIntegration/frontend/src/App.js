import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:5000");

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    const msgData = { name, message };
    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div style={{ border: "2px solid black", width: "400px", margin: "50px auto", padding: "10px", textAlign: "center" }}>
      <h2>💬 Real-Time Chat App</h2>

      <input
        style={{ marginBottom: "10px" }}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <form onSubmit={sendMessage}>
        <input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <div style={{ border: "1px solid gray", marginTop: "20px", padding: "10px", textAlign: "left", height: "200px", overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
