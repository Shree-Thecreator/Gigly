"use client";

import ChatWindow from "@/components/ChatWindow";
import Loader from "@/components/Loader";
import Login from "@/components/Login";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/services/supabase";

const ChatApp = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) {
    return <Loader message="Syncing secure session..." />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-10 py-3 bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-2.5 text-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex justify-center items-center font-bold text-xs text-white">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Connected as</span>
            <strong className="text-white">{user.email?.split('@')[0]}</strong>
          </div>
        </div>

        <button
          className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-[13px] font-semibold cursor-pointer transition-all hover:bg-red-500 hover:text-white"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </header>

      <main className="flex-1 flex justify-center items-center p-0">
        <ChatWindow />
      </main>
    </div>
  );
};

export default function ChatPage() {
  return <ChatApp />;
}
