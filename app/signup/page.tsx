"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function SignUp() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email to confirm your sanctuary access!");
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full border-4 border-sanctuary-gold">
        <div className="text-center mb-8">
           <img src="/images/DDSlogo.png" alt="Logo" className="h-20 mx-auto mb-4" />
           <h1 className="text-2xl font-serif text-sanctuary-green font-bold uppercase">Join the Flock</h1>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 rounded-xl bg-gray-100 border-2 border-transparent focus:border-sanctuary-gold outline-none text-slate-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            className="w-full p-4 rounded-xl bg-gray-100 border-2 border-transparent focus:border-sanctuary-gold outline-none text-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-sanctuary-green text-sanctuary-gold font-black py-4 rounded-xl hover:bg-black transition-all uppercase tracking-widest">
            Create Guardian Account
          </button>
        </form>

        {message && <p className="mt-6 text-center text-xs font-bold text-sanctuary-green italic">{message}</p>}
        
        <Link href="/" className="block mt-8 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-sanctuary-gold">
          ← Back to Mission
        </Link>
      </div>
    </main>
  );
}
