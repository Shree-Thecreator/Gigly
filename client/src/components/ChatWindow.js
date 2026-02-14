import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { supabase } from "../services/supabase"; // Import your supabase client

const socket = io("https://chat-app-nine-mauve-28.vercel.app/");

export default function ChatWindow() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [pin, setPin] = useState("");
  const [isInRoom, setIsInRoom] = useState(false); // Track if user entered correct PIN
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Logic to verify PIN against the Supabase 'rooms' table
  const handleJoinRoom = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('name', roomName)
      .single();

    if (error || !data) {
      alert("Room not found!");
      return;
    }

    if (data.pin === pin) {
      socket.emit("join_room", roomName); // Tell Socket.io to join this specific group
      setIsInRoom(true);
      alert(`Welcome to ${roomName}!`);
    } else {
      alert("Incorrect PIN!");
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const msgData = {
        room: roomName, // Send room name so only group members get it
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: socket.id
      };
      socket.emit("send_message", msgData);
      setChat((prev) => [...prev, msgData]);
      setMessage("");
    }
  };

  // If not in a room, show the PIN entry screen
  if (!isInRoom) {
    return (
      <div style={{ padding: "40px", textAlign: "center", background: "#f0f0f0", height: "100vh" }}>
        <h2>Enter Chat Room</h2>
   
        <input 
         placeholder="Room Name" 
          value={roomName} 
          onChange={(e) => setRoomName(e.target.value)} 
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        
        <input 
          placeholder="Enter PIN" 
          type="password"
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        <button onClick={handleJoinRoom} style={{ padding: "10px 20px", cursor: "pointer", background: "#075e54", color: "white", border: "none" }}>
          Join Room
        </button>
      </div>
    );
  }

  // If PIN is correct, show the existing Chat UI
  return (
    <div style={{
      maxWidth: "420px",
      margin: "40px auto",
      background: "#f5f5f5",
      height: "90vh",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ background: "#075e54", color: "white", padding: "16px", textAlign: "center" }}>
        💬 Room: {roomName}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#e5ddd5" }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.sender === socket.id ? "flex-end" : "flex-start", marginBottom: "10px" }}>
            <div style={{ background: msg.sender === socket.id ? "#dcf8c6" : "white", padding: "10px", borderRadius: "10px" }}>
              {msg.text} <br/>
              <small style={{ fontSize: "10px", color: "#999" }}>{msg.time}</small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: "12px", display: "flex", gap: "10px", background: "#f0f0f0" }}>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..." 
          style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "none" }}
        />
        <button onClick={sendMessage} style={{ background: "#075e54", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px" }}>➤</button>
      </div>
    </div>
  );
}