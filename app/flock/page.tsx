"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import HeritageGallery from '@/components/HeritageGallery';

export default function FlockPage() {
  // 1. Add a mounting check to prevent prerendering errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. If we are not mounted (i.e., during the Vercel Build), return a shell
  // This completely stops Vercel from trying to fetch data during build.
  if (!mounted) {
    return <div className="min-h-screen bg-sanctuary-cream" />;
  }

  return (
    <main className="min-h-screen bg-sanctuary-cream">
      <nav className="bg-sanctuary-green py-4 px-8 flex justify-between items-center border-b-2 border-sanctuary-gold/50 shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/DDSlogo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-sanctuary-gold font-serif font-bold text-lg tracking-tighter">DECENT DUCKS</span>
        </Link>
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-sanctuary-cream hover:text-sanctuary-gold transition-colors">
          ← Back to Mission
        </Link>
      </nav>

      <header className="bg-sanctuary-green text-center py-20 px-6 border-b-4 border-sanctuary-gold shadow-xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-sanctuary-gold mb-4 uppercase tracking-tight">
          The Heritage Tree
        </h1>
        <p className="text-sanctuary-cream text-xl italic font-light max-w-2xl mx-auto leading-relaxed">
          "Meet the current residents of our Nashville haven."
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <Suspense fallback={<div className="text-center font-black uppercase text-gray-400">Loading Flock...</div>}>
          <HeritageGallery />
        </Suspense>
      </div>

      <footer className="py-20 text-center bg-white border-t border-gray-100">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
          © 2026 Decent Ducks Sanctuary
        </p>
      </footer>
    </main>
  );
}
