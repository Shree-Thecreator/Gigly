"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../services/supabase";
import { useToast } from "./ToastProvider";

interface Message {
  room: string;
  text: string;
  time: string;
  sender: string;
}

export default function ChatWindow() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [lastSentTime, setLastSentTime] = useState<number>(0);
  const channelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, []);

  const handleJoinRoom = async () => {
    if (!user) {
      showToast("You must be logged in to join a room", "error");
      return;
    }

    if (!roomName || !pin) {
      showToast("Please enter both Room Name and Secret Key", "info");
      return;
    }

    // AUTH CHECK: Verify room exists and PIN is correct
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('name', roomName)
      .maybeSingle();

    if (error || !data) {
      showToast("Room not found!", "error");
      return;
    }

    if (data.pin === pin) {
      // INITIALIZE SUPABASE REALTIME CHANNEL (Secure via Supabase Auth)
      const channel = supabase.channel(`room:${roomName}`, {
        config: {
          broadcast: { self: true }, // See our own messages
        }
      });

      channel
        .on('broadcast', { event: 'message' }, ({ payload }) => {
          setChat((prev) => [...prev, payload]);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsInRoom(true);
            showToast(`Securely connected to ${roomName}`, "success");
          }
        });

      channelRef.current = channel;
    } else {
      showToast("Incorrect Secret Key!", "error");
    }
  };

  const sendMessage = () => {
    // RATE LIMITING: Prevent spamming (1 message per 500ms)
    const now = Date.now();
    if (now - lastSentTime < 500) {
      showToast("Wait a moment before sending another message", "info");
      return;
    }

    if (message.trim() !== "" && channelRef.current && user) {
      const msgData: Message = {
        room: roomName,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: user.id // Using stable Supabase user ID
      };

      // Broadcast message through Supabase
      channelRef.current.send({
        type: 'broadcast',
        event: 'message',
        payload: msgData
      });

      setMessage("");
      setLastSentTime(now);
    }
  };

  const leaveRoom = () => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
    setIsInRoom(false);
    setChat([]);
  };

  if (!isInRoom) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 bg-[radial-gradient(circle_at_center,#1e293b,#0f172a)] font-main">
        <div className="bg-dark-card backdrop-blur-xl border border-white/10 rounded-[24px] p-10 w-full max-w-[380px] text-center animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
          <div className="w-10 h-10 bg-primary rounded-xl flex justify-center items-center text-xl shadow-[0_4px_12px_rgba(99,102,241,0.3)] mx-auto mb-5 text-white">🔐</div>
          <h2 className="text-[28px] mb-2 font-extrabold text-white">Enter Room</h2>
          <p className="text-slate-400 mb-6 text-sm">Provide the room name and secret key to join the conversation.</p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Room Name</label>
              <input
                placeholder="Global Chat"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-black/20 border border-white/10 rounded-xl p-3.5 text-white text-[15px] transition-all outline-none focus:border-primary focus:bg-black/30"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
              <input
                placeholder="••••••••"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-black/20 border border-white/10 rounded-xl p-3.5 text-white text-[15px] transition-all outline-none focus:border-primary focus:bg-black/30"
              />
            </div>

            <button onClick={handleJoinRoom} className="bg-primary text-white border-none rounded-xl p-3.5 text-base font-semibold cursor-pointer transition-all mt-2.5 shadow-lg hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-white max-w-[1200px] mx-auto shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden font-main w-full">
      <header className="px-6 py-5 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center z-10 font-main">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex justify-center items-center text-xl shadow-[0_4px_12px_rgba(99,102,241,0.3)]">💬</div>
          <div>
            <h3 className="text-lg font-bold leading-tight">{roomName}</h3>
            <p className="text-[12px] text-success flex items-center gap-1 before:content-[''] before:w-1.5 before:h-1.5 before:bg-current before:rounded-full">Realtime Secured</p>
          </div>
        </div>
        <button
          onClick={leaveRoom}
          className="bg-transparent border-none text-slate-400 cursor-pointer text-sm hover:text-white transition-colors"
        >
          Leave Room
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.9)),url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {chat.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.sender === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-3 px-4 rounded-[18px] relative text-[15px] leading-relaxed shadow-sm transition-transform hover:scale-[1.02] ${msg.sender === user?.id
              ? 'bg-primary text-white rounded-br-none'
              : 'bg-slate-800 text-white border border-white/10 rounded-bl-none'
              }`}>
              {msg.text}
              <small className="block text-[10px] mt-1 opacity-70 text-right">{msg.time}</small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/10 flex gap-3 items-center">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write your message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white text-[15px] outline-none transition-all focus:bg-white/10 focus:border-primary"
        />
        <button onClick={sendMessage} className="w-12 h-12 bg-primary text-white border-none rounded-2xl flex justify-center items-center cursor-pointer text-xl transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100">
          ➤
        </button>
      </div>
    </div>
  );
}
