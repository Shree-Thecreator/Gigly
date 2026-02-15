import React from "react";
// Importing the UI components you created in the components folder
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login"; 
import './App.css'; // Import the centering styles
// Importing the Auth logic and the Supabase client
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { supabase } from "./services/supabase";

// This component handles the logic of what to show based on the user's session
const ChatApp = () => {
  const { user, loading } = useAuth();

  // 1. Handle the Logout functionality
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      alert("Logged out successfully!");
    }
  };

  // 2. While checking for a saved session in Local Storage, show a loading screen
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
        <h3>Checking session...</h3>
      </div>
    );
  }

  // 3. If no user is logged in, show the Login/Sign Up component
  if (!user) {
    return <Login />;
  }

  // 4. If a user exists, show the main Chat Room
  return (
    <div className="App" style={{ fontFamily: 'Arial' }}>
      <header style={{ 
        padding: '10px 20px', 
        background: '#333', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <span>Logged in as: <strong>{user.email}</strong></span>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '5px 15px', 
            cursor: 'pointer', 
            background: '#ff4d4d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          Logout
        </button>
      </header>
      
      <main style={{ padding: '20px' }}>
        <ChatWindow />
      </main>
    </div>
  );
};

// The main App component wraps everything in the AuthProvider
function App() {
  return (
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  );
}

export default App;