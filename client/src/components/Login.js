import React, { useState } from 'react';
import { supabase } from '../services/supabase';

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
    <div className="login-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{isSignUp ? 'Create Account' : 'Login to Chat'}</h2>
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
        </button>
      </form>
      
      <p 
        style={{ marginTop: '15px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} 
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;