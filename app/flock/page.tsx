"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// THE "MAGIC" FIX: ssr: false tells Vercel NOT to run this during the build.
const HeritageGallery = dynamic(() => import('@/components/HeritageGallery'), { 
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-[2.5rem]"></div>
      ))}
    </div>
  )
});

export default function FlockPage() {
  return (
    <main className="min-h-screen bg-sanctuary-cream">
      
      {/* NAVIGATION */}
      <nav className="bg-sanctuary-green py-4 px-8 flex justify-between items-center border-b-2 border-sanctuary-gold/50 shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/DDSlogo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-sanctuary-gold font-serif font-bold text-lg tracking-tighter uppercase">DECENT DUCKS</span>
        </Link>
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-sanctuary-cream hover:text-sanctuary-gold transition-colors">
          ← Back to Mission
        </Link>
      </nav>

      {/* HEADER */}
      <header className="bg-sanctuary-green text-center py-20 px-6 border-b-4 border-sanctuary-gold shadow-xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-sanctuary-gold mb-4 uppercase tracking-tight">
          The Heritage Tree
        </h1>
        <p className="text-sanctuary-cream text-xl italic font-light max-w-2xl mx-auto leading-relaxed">
          "Meet the current residents of our Nashville haven."
        </p>
      </header>

      {/* GALLERY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 flex justify-between items-end border-b border-gray-200 pb-6">
          <h2 className="text-3xl font-serif text-sanctuary-green font-bold">The Resident Roster</h2>
          <p className="text-sanctuary-gold font-black uppercase text-[10px] tracking-[0.3em] italic">Nashville, TN</p>
        </div>

        <HeritageGallery />
      </div>

      <footer className="py-20 text-center bg-white border-t border-gray-100">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
          © 2026 Decent Ducks Sanctuary
        </p>
      </footer>
    </main>
  );
}
