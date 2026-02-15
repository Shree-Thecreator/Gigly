import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isSignUp) {
      // Logic for new users to enter directly
      result = await supabase.auth.signUp({ email, password });
    } else {
      // Logic for returning users
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    // Fixed: Removed 'data' because it was unused, which solves the ESLint warning
    const { error } = result;

    if (error) {
      alert(error.message);
    } else {
      if (isSignUp) {
        alert('Registration almost complete! Please go to your email and check for the confirmation link. Once you click it, the process will be complete and you can log in to join the chat.');
      } else {
        alert('Logged in successfully!');
      }
    }
    setLoading(false);
  };

  return (
    /* 1. Changed className to "login-card" to match your CSS file. 
       2. Removed inline style={{ textAlign: 'center', marginTop: '100px' }} 
          so your Login.css can take control. 
    */
    <div className="login-card">
      <h2 className="login-title">
        {isSignUp ? 'Create Account' : 'Login to Chat'}
      </h2>

      <form onSubmit={handleAuth} className="login-form">
        <span className="login-label">Email Address</span>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="login-input"
        />

        <span className="login-label">Password</span>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="login-input"
        />

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
        </button>
      </form>
      
      <p 
        className="login-toggle"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
