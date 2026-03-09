"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function PortalPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Live Sanctuary & Community Data
  const [dailyLog, setDailyLog] = useState<any>(null);
  const [userFlock, setUserFlock] = useState<any[]>([]);
  const [communityBonus, setCommunityBonus] = useState<any>(null);

  // Community Partner Mapping
  const communityRewards: Record<string, any> = {
    "QUAKK-G0": { partner: "Quakk", bird: "Quakk Community Resident", breed: "Pekin" },
    "QUAKEY-G0": { partner: "Quakey", bird: "Quakey Community Resident", breed: "Buff Orpington" },
    "STRAY-G0": { partner: "Solana Strays", bird: "Strays Community Resident", breed: "Runner" },
    "GODS-G0": { partner: "SolGods", bird: "SolGods Community Resident", breed: "Swedish Blue" }
  };

  useEffect(() => {
    const syncPortal = async () => {
      // 1. Check for Persistent Session (The "Facebook/X" feel)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      setUser(session.user);

      // 2. Fetch Today's Care Logs from Nashville Admin
      const today = new Date().toISOString().split('T')[0];
      const { data: logData } = await supabase
        .from('daily_care_logs')
        .select('*')
        .eq('date', today)
        .single();
      setDailyLog(logData);

      // 3. Fetch specific birds this Guardian has adopted
      const { data: flockData } = await supabase
        .from('birds')
        .select('*')
        .eq('guardian_id', session.user.id);
      setUserFlock(flockData || []);

      // 4. Check for Community Referral Bonus
      // (Assuming the code is stored in the user's metadata or a profile table)
      const userCode = session.user.user_metadata?.referral_code?.toUpperCase();
      if (userCode && communityRewards[userCode]) {
        setCommunityBonus(communityRewards[userCode]);
      }

      setLoading(false);
    };

    syncPortal();
  }, [supabase]);

  if (loading) return (
    <div className="min-h-screen bg-sanctuary-cream flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sanctuary-gold mx-auto mb-4"></div>
        <p className="text-[10px] font-black text-sanctuary-green uppercase tracking-[0.2em]">Syncing Sanctuary Pulse...</p>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-sanctuary-gold text-3xl font-serif mb-4 uppercase">Session Expired</h2>
        <p className="text-gray-400 mb-8 italic max-w-xs">Please use your Referral Code on the home page to re-enter the sanctuary.</p>
        <Link href="/" className="bg-sanctuary-gold text-sanctuary-green px-10 py-4 rounded-full font-black uppercase text-xs shadow-2xl hover:bg-white transition-all">
          Return to Mission
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-sanctuary-cream font-sans text-sanctuary-dark">
      
      {/* 1. PORTAL NAVIGATION */}
      <nav className="bg-sanctuary-green py-4 px-8 flex justify-between items-center border-b-4 border-sanctuary-gold sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/images/DDSlogo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-sanctuary-gold font-serif font-bold uppercase tracking-tighter text-lg">Guardian Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-sanctuary-cream font-bold hidden md:block">{user.email}</span>
          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")}
            className="text-[10px] font-black text-sanctuary-cream uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-sanctuary-green transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* 2. WELCOME HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-5xl font-serif text-sanctuary-green font-bold">Guardian Dashboard</h1>
            <p className="text-sanctuary-gold font-black uppercase text-[10px] tracking-[0.3em] mt-2 italic">Nashville Sanctuary Live Connection</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Sanctuary Sync:</p>
            <p className="text-xs font-mono text-sanctuary-green font-bold">
              {dailyLog?.updated_at ? new Date(dailyLog.updated_at).toLocaleTimeString() : 'Awaiting Daily Rounds'}
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 3. LIVE CARE LOGS (Synced from Admin Dashboard) */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex justify-between items-center">
              Daily Care Status <span className="text-sanctuary-green animate-pulse">● LIVE</span>
            </h3>
            <div className="space-y-4">
               {[
                 { label: "Fresh Water Pools", done: dailyLog?.water_filled },
                 { label: "Premium Feed Refill", done: dailyLog?.feed_refilled },
                 { label: "Coop Inspection", done: dailyLog?.coop_cleaned },
                 { label: "Individual Health Checks", done: dailyLog?.health_check }
               ].map((task, i) => (
                 <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border ${task.done ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                   <span className={`text-sm font-bold ${task.done ? 'text-green-700' : 'text-gray-400'}`}>{task.label}</span>
                   <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${task.done ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-500'}`}>
                     {task.done ? 'Complete' : 'Pending'}
                   </span>
                 </div>
               ))}
            </div>
            <p className="mt-8 text-[10px] text-gray-400 italic text-center leading-relaxed uppercase tracking-tighter">
              Updated daily from the Nashville sanctuary grounds.
            </p>
          </section>

          {/* 4. COMMUNITY REWARD & NESTING STATUS */}
          <div className="space-y-8">
            {/* Community Reward Card */}
            {communityBonus && (
              <section className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border-2 border-sanctuary-gold relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-sanctuary-gold text-sanctuary-green text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
                  Community Partner
                </div>
                <h3 className="text-[10px] font-black text-sanctuary-gold uppercase tracking-[0.2em] mb-6">Partner Reward Unlocked</h3>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-sanctuary-gold/10 rounded-2xl flex items-center justify-center text-4xl border border-sanctuary-gold/30">🦆</div>
                  <div>
                    <p className="text-white font-serif text-lg">{communityBonus.bird}</p>
                    <p className="text-sanctuary-gold text-[10px] font-black uppercase mt-1 tracking-tighter">Verified {communityBonus.partner} Member</p>
                  </div>
                </div>
              </section>
            )}

            {/* Nesting Status Section */}
            <section className="bg-sanctuary-green p-8 rounded-[2.5rem] shadow-xl text-center flex flex-col items-center justify-center min-h-[250px]">
              <span className="text-6xl mb-4">🪺</span>
              <h3 className="text-[10px] font-black text-sanctuary-gold uppercase tracking-[0.2em] mb-4">Nesting Insights</h3>
              <p className="text-sanctuary-cream font-serif italic text-lg leading-relaxed">
                "The hens are currently in a <span className="text-sanctuary-gold">Broody Cycle</span>. We are providing extra quiet and specialized calcium snacks."
              </p>
            </section>
          </div>

          {/* 5. INDIVIDUAL ADOPTED RESIDENTS */}
          <section className="bg-white p-8 rounded-[2.5rem] border-2 border-sanctuary-gold shadow-xl h-fit">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-sanctuary-green font-bold">Your Residents</h3>
                <span className="text-[10px] font-black text-gray-400 uppercase">{userFlock.length} Total</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {userFlock.length > 0 ? userFlock.map(bird => (
                  <div key={bird.id} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner">
                    <img src={bird.image_url || '/images/DDSlogo.png'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute bottom-0 inset-x-0 bg-sanctuary-green/90 p-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white font-bold text-[10px] uppercase tracking-tighter">{bird.name}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 aspect-video bg-gray-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 text-center">
                    <span className="text-4xl mb-3 opacity-20">🦆</span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                      Visit the Heritage Tree to virtually adopt your first resident.
                    </p>
                  </div>
                )}
             </div>
             <Link href="/flock" className="block mt-8 text-center text-[10px] font-black text-sanctuary-gold border-2 border-sanctuary-gold/20 py-3 rounded-xl uppercase tracking-[0.2em] hover:bg-sanctuary-gold hover:text-sanctuary-green transition-all">
               Meet More Residents →
             </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
