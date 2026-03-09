"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import GuardianButton from '@/components/GuardianButton';

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMightyDuck, setIsMightyDuck] = useState(false);
  const [donationTier, setDonationTier] = useState<"monthly" | "yearly">("monthly");
  const [chosenName, setChosenName] = useState("");

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = passcode.trim().toUpperCase(); 

    const codes: Record<string, string> = {
      "JASMINE-JDI-G0": "Sanctuary Admin Access Granted.",
      "STRAY-G0": "Welcome back, Joey's Guardian!",
      "QUAKEY-G0": "Welcome back, Cutie Pie's Guardian!",
      "PAKK-G0": "Welcome back, Jordie's Guardian!",
      "GODS-G0": "Welcome back, Huey's Guardian!",
      "MIGHTY-DUCKS-2026": "Mighty Duck Referral Unlocked!",
    };

    if (codes[trimmedCode]) {
      setAccessMessage(codes[trimmedCode]);
      setIsAdmin(trimmedCode === "JASMINE-JDI-G0");
      setIsMightyDuck(trimmedCode === "MIGHTY-DUCKS-2026");
    } else {
      setAccessMessage("Code not recognized. Please check your referral.");
      setIsAdmin(false);
      setIsMightyDuck(false);
    }
  };

  return (
    <main className="min-h-screen bg-sanctuary-cream font-sans text-sanctuary-dark">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <nav className="bg-sanctuary-green/95 backdrop-blur-sm py-4 px-8 sticky top-0 z-50 flex justify-between items-center border-b-2 border-sanctuary-gold/50 shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/DDSlogo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-sanctuary-gold font-serif font-bold text-lg tracking-tighter">DECENT DUCKS</span>
        </Link>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-sanctuary-cream">
          <Link href="/" className="hover:text-sanctuary-gold transition-colors">Mission</Link>
          <Link href="/flock" className="hover:text-sanctuary-gold transition-colors">Meet The Flock</Link>
          <a href="#adopt" className="hover:text-sanctuary-gold transition-colors bg-sanctuary-gold/10 px-3 py-1 rounded-full">Virtual Adoption</a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="bg-sanctuary-green text-center py-24 px-6 border-b-8 border-sanctuary-gold relative overflow-hidden">
        <div className="flex justify-center mb-8 relative z-10">
          <img src="/images/DDSlogo.png" alt="Decent Ducks Logo" className="h-48 w-auto drop-shadow-2xl" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-sanctuary-gold mb-6 uppercase tracking-tight relative z-10">
          Decent Ducks
        </h1>
        <p className="text-sanctuary-cream text-2xl italic font-light max-w-4xl mx-auto leading-relaxed relative z-10">
          "A quiet, high-quality sanctuary for the often forgotten domestic duck."
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        
        {/* 3. MISSION SECTION */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-serif text-sanctuary-green font-bold">Our Nashville Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Established in 2023, Decent Ducks Sanctuary provides a permanent haven for domestic ducks in Tennessee. Unlike wild waterfowl, domestic breeds cannot fly or forage effectively without human care.
            </p>
            <div className="bg-slate-900 p-10 rounded-[2.5rem] border-2 border-sanctuary-gold shadow-2xl">
              <h3 className="text-sanctuary-gold font-bold uppercase text-xs tracking-[0.3em] mb-6">Sanctuary Standards:</h3>
              <ul className="text-white space-y-5 text-sm italic font-light">
                <li className="flex gap-3"><span>🦆</span> Daily health inspections & "bumblefoot" checks</li>
                <li className="flex gap-3"><span>🌾</span> Specialized nutrition for domestic needs</li>
                <li className="flex gap-3"><span>🏠</span> Safe, predator-proof housing</li>
              </ul>
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2">
            <img src="/images/joey.png" alt="Joey the Founder" className="w-full h-auto" />
          </div>
        </section>

        {/* 4. VIRTUAL ADOPTION SECTION (SPECIFIC BIRD) */}
        <section id="adopt" className="bg-white border-2 border-sanctuary-gold rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="bg-sanctuary-green p-12 text-center text-sanctuary-gold">
            <h2 className="text-4xl font-serif font-bold uppercase tracking-wide">Virtual Adoption</h2>
            <p className="text-sanctuary-cream italic mt-2 text-xl">Name and support a specific Nashville resident.</p>
          </div>
          
          <div className="p-12 grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-serif text-sanctuary-green underline decoration-sanctuary-gold underline-offset-8">The Guardian Experience</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Connect directly with our residents. Adoption fees cover essential daily costs for specific birds.
              </p>
              <div className="bg-sanctuary-cream/50 p-8 rounded-3xl border border-sanctuary-gold/30">
                <p className="text-xs font-black text-sanctuary-green mb-4 uppercase tracking-[0.2em]">Guardian Portal Features:</p>
                <ul className="text-sm text-gray-600 space-y-3 italic font-medium">
                  <li>• Daily care & health checklists</li>
                  <li>• Real-time egg production logs</li>
                  <li>• Seasonal broody status updates</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <div className="w-full space-y-3">
                <label className="text-sanctuary-green font-black text-[10px] uppercase tracking-[0.3em] block text-center">
                  Name your rescue resident:
                </label>
                <input 
                  type="text"
                  placeholder="Enter a name..."
                  className="w-full p-6 rounded-2xl bg-slate-900 border-2 border-sanctuary-gold focus:border-sanctuary-green outline-none font-serif text-2xl italic text-white placeholder-gray-600 shadow-2xl text-center"
                  value={chosenName}
                  onChange={(e) => setChosenName(e.target.value)}
                />
              </div>
              <GuardianButton type="adoption" amount={donationTier === "monthly" ? "20.00" : "175.00"} duckName={chosenName} />
            </div>
          </div>
        </section>

        {/* 5. SANCTUARY GROWTH FUND (GENERAL SUPPORT) */}
        <section className="bg-white border-2 border-sanctuary-green rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="bg-slate-900 p-10 text-center text-sanctuary-gold">
            <h2 className="text-3xl font-serif font-bold uppercase tracking-widest">Sanctuary Growth Fund</h2>
            <p className="text-gray-400 italic mt-2 text-lg">Help us expand our Nashville haven for future rescues.</p>
          </div>
          
          <div className="p-10 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-sanctuary-green underline decoration-sanctuary-gold">Future Projects</h3>
              <p className="text-gray-700 leading-relaxed">
                General donations fund infrastructure that allows us to grow, from new coops to perimeter fencing.
              </p>
              <div className="bg-sanctuary-cream/50 p-6 rounded-2xl border border-sanctuary-gold/30">
                <h4 className="font-bold text-sanctuary-green mb-3 uppercase text-[10px] tracking-widest text-center">Infrastructure Goals:</h4>
                <ul className="text-xs text-gray-600 space-y-2 italic text-center">
                  <li>• Predator-proof housing construction</li>
                  <li>• Safe foraging area expansion</li>
                  <li>• Freshwater pool infrastructure</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">No bird naming required—just mission support.</p>
              <GuardianButton type="general" amount="50.00" />
            </div>
          </div>
        </section>

        {/* 6. REFERRAL PORTAL ACCESS */}
        <div className="bg-slate-900 p-16 rounded-[4rem] border-2 border-sanctuary-gold shadow-2xl max-w-3xl mx-auto">
          <h3 className="text-4xl font-serif text-sanctuary-gold mb-6 text-center uppercase tracking-tight">Sanctuary Portal</h3>
          <p className="text-gray-400 text-center text-lg mb-10 italic font-light">
            Enter your Referral Code to view your adopted birds and daily sanctuary logs.
          </p>
          <form onSubmit={handlePasscodeSubmit} className="space-y-6 max-w-md mx-auto">
            <input 
              type="text"
              placeholder="ENTER REFERRAL CODE"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-6 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-sanctuary-gold outline-none text-center font-mono uppercase text-white text-xl tracking-[0.3em] shadow-inner"
            />
            <button type="submit" className="w-full bg-sanctuary-gold text-sanctuary-green font-black py-6 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl text-xl uppercase tracking-widest">
              ENTER PORTAL
            </button>
          </form>
          {accessMessage && (
            <p className="mt-8 text-center text-xs font-black text-sanctuary-gold uppercase tracking-[0.2em] animate-pulse">
              ✨ {accessMessage}
            </p>
          )}
        </div>
      </div>

      {isAdmin && <section className="bg-white/50 py-24 px-6 border-t-8 border-sanctuary-gold"><div className="max-w-7xl mx-auto"><AdminDashboard /></div></section>}

      <footer className="py-24 text-center border-t border-gray-200">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Decent Ducks Sanctuary | Nashville, Tennessee</p>
      </footer>
    </main>
  );
}
