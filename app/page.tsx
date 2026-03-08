"use client";

import React, { useState } from 'react';
import HeritageGallery from '@/components/HeritageGallery';
import AdminDashboard from '@/components/AdminDashboard';

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const codes: Record<string, string> = {
      "Jasmine-JDI-G0": "Super-Admin Access Granted.",
      "STRAY-G0": "Welcome, Joey's Guardian!",
      "QUAKEY-G0": "Welcome, Cutie Pie's Guardian!",
      "PAKK-G0": "Welcome, Jordie's Guardian!",
      "GODS-G0": "Welcome, Huey's Guardian!",
      "MIGHTY-DUCKS-2026": "Mighty Ducks Family Access Unlocked!",
    };

    const trimmedCode = passcode.trim();

    if (codes[trimmedCode]) {
      setAccessMessage(codes[trimmedCode]);
      // If it's the admin code, unlock the dashboard
      if (trimmedCode === "Jasmine-JDI-G0") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false); // Reset if they enter a non-admin code
      }
    } else {
      setAccessMessage("Invalid Passcode. Please try again.");
      setIsAdmin(false);
    }
  };

  return (
    <main className="min-h-screen bg-sanctuary-cream font-sans text-sanctuary-dark">
      
      {/* 1. HERO SECTION & LOGO */}
      <header className="bg-sanctuary-green text-center py-16 px-6 border-b-8 border-sanctuary-gold">
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <img 
              src="/images/DDSlogo.png" 
              alt="Decent Ducks Logo" 
              className="h-40 w-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-sanctuary-gold mb-6 tracking-tight uppercase">
          Decent Ducks
        </h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-sanctuary-cream text-xl md:text-2xl italic font-light leading-relaxed">
            "Providing a quiet, high-quality home for our flock. We prioritize stress-free environments and dedicated daily care, supported by bird lovers worldwide."
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 2. THE HERITAGE TREE (G0 Gallery) */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-sanctuary-green font-bold">The Heritage Tree</h2>
            <p className="text-sanctuary-gold font-bold tracking-widest uppercase text-sm mt-2">Explore the G0 Founding Flock</p>
          </div>
          <HeritageGallery />
        </section>

        <div className="grid md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
          
          {/* 3. MISSION & VISION */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-serif text-sanctuary-green mb-4 border-l-4 border-sanctuary-gold pl-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We offer a unique opportunity to virtually adopt our ducks as if you were here yourself. 
                Your contribution is a donation toward our nonprofit mission of providing dedicated care, with our team performing all physical sanctuary work on your behalf.
              </p>
            </section>

            {/* SANCTUARY HEARTBEAT */}
            <section className="bg-sanctuary-green text-sanctuary-cream p-8 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-serif text-sanctuary-gold">Sanctuary Heartbeat</h3>
                <span className="animate-pulse bg-sanctuary-gold text-sanctuary-green px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Care Completion</span>
                  <span className="font-bold">95%</span>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div className="bg-sanctuary-gold h-full w-[95%] transition-all duration-1000"></div>
                </div>
              </div>
            </section>
          </div>

          {/* 4. PASSCODE SIDEBAR */}
          <aside className="">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-sanctuary-gold sticky top-8">
              <h3 className="text-2xl font-serif text-sanctuary-green mb-4 text-center">Sanctuary Access</h3>
              <p className="text-sm text-gray-600 mb-6 text-center italic">
                Enter your Guardian code to unlock your virtual flock features.
              </p>
              
              <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                <input 
                  type="text"
                  placeholder="CODE-G0"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-sanctuary-green outline-none text-center font-mono text-lg uppercase"
                />
                <button 
                  type="submit"
                  className="w-full bg-sanctuary-green text-sanctuary-gold font-bold py-3 rounded-lg hover:bg-black transition-colors"
                >
                  VALIDATE ACCESS
                </button>
              </form>

              {accessMessage && (
                <div className={`mt-4 p-3 rounded text-center text-sm font-bold ${
                  accessMessage.includes("Invalid") ? "bg-red-50 text-red-600" : "bg-green-50 text-sanctuary-green"
                }`}>
                  {accessMessage}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* 5. HIDDEN ADMIN DASHBOARD (Appears after Admin Code) */}
        {isAdmin && (
          <section className="mt-20 pt-20 border-t-4 border-dotted border-sanctuary-gold">
            <AdminDashboard />
          </section>
        )}

      </div>

      <footer className="py-20 text-center text-gray-400 text-sm">
        © 2026 Decent Ducks Sanctuary | Built for the Flock
      </footer>
    </main>
  );
}
