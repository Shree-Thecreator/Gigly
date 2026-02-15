"use client";

import { FormEvent, useState } from 'react';
import { supabase } from '../services/supabase';
import { useToast } from './ToastProvider';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { showToast } = useToast();

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    const { error } = result;

    if (error) {
      showToast(error.message, "error");
    } else {
      if (isSignUp) {
        showToast('Registration almost complete! Please check your email for the confirmation link.', "info");
      } else {
        showToast('Logged in successfully!', "success");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-vh-100 bg-[radial-gradient(circle_at_top_left,#1e1b4b,#0f172a)] p-5 min-h-screen">
      <div className="bg-dark-card backdrop-blur-xl border border-white/10 rounded-[24px] p-10 w-full max-w-[420px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-5 duration-700">
        <h2 className="text-[32px] font-extrabold mb-2 text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {isSignUp ? 'Join Us' : 'Welcome Back'}
        </h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          {isSignUp ? 'Create an account to start chatting' : 'Sign in to your account to continue'}
        </p>

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/20 border border-white/10 rounded-xl p-3.5 text-white text-[15px] transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-black/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/20 border border-white/10 rounded-xl p-3.5 text-white text-[15px] transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-black/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white border-none rounded-xl p-3.5 text-base font-semibold cursor-pointer transition-all mt-2.5 shadow-lg hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span
            className="text-primary cursor-pointer font-medium ml-1 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
