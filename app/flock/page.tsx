"use client";


import React from 'react';
import Link from 'next/link';
import HeritageGallery from '@/components/HeritageGallery';

export default function FlockPage() {
  return (
    <main className="min-h-screen bg-sanctuary-cream font-sans text-sanctuary-dark">
      
      {/* STICKY NAVIGATION BAR */}
      <nav className="bg-sanctuary-green/95 backdrop-blur-sm py-4 px-8 sticky top-0 z-50 flex justify-between items-center border-b-2 border-sanctuary-gold/50 shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/DDSlogo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-sanctuary-gold font-serif font-bold text-lg tracking-tighter">DECENT DUCKS</span>
        </Link>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-sanctuary-cream">
          <Link href="/" className="hover:text-sanctuary-gold transition-colors">Mission</Link>
          <Link href="/flock" className="text-sanctuary-gold">Meet The Flock</Link>
          <Link href="/#adopt" className="hover:text-sanctuary-gold transition-colors bg-sanctuary-gold/10 px-3 py-1 rounded-full">Virtual Adoption</Link>
        </div>
      </nav>

      {/* FLOCK HEADER */}
      <header className="bg-white py-20 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-sanctuary-green mb-4 uppercase tracking-tight">
            Our Residents
          </h1>
          <div className="w-24 h-1 bg-sanctuary-gold mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg italic leading-relaxed">
            From our Generation Zero founders to our newest rescued recruits, every bird at Decent Ducks Sanctuary in Nashville has a name, a lineage, and a story.
          </p>
        </div>
      </header>

      {/* GALLERY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif text-sanctuary-green font-bold">The Heritage Tree</h2>
            <p className="text-xs font-black text-sanctuary-gold uppercase tracking-widest mt-1">Live Sanctuary Registry</p>
          </div>
          
          {/* QUICK LEGEND */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sanctuary-gold"></div>
              <span className="text-[10px] font-bold uppercase text-gray-400">G0 Founder</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sanctuary-green"></div>
              <span className="text-[10px] font-bold uppercase text-gray-400">Sanctuary Resident</span>
            </div>
          </div>
        </div>

        {/* THE CORE GALLERY COMPONENT */}
        <HeritageGallery />
      </div>

      {/* CALL TO ACTION FOOTER */}
      <section className="bg-sanctuary-green py-20 px-6 mt-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-serif text-sanctuary-gold font-bold uppercase">Help Us Grow the Flock</h2>
          <p className="text-sanctuary-cream text-lg italic">
            Your virtual adoption directly supports the daily care of these specific birds.
          </p>
          <Link href="/#adopt" className="inline-block bg-sanctuary-gold text-sanctuary-green px-10 py-4 rounded-full font-black text-sm uppercase shadow-xl hover:bg-white transition-all">
            Virtually Adopt a Duck
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        © 2026 Decent Ducks Sanctuary | Protected Nashville Haven
      </footer>
    </main>
  );
}
