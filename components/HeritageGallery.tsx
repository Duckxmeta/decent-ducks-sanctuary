"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Bird {
  id: string;
  name: string | null;
  origin: 'Hatched' | 'Adopted';
  image_url: string | null;
  is_founding_four: boolean;
  is_available: boolean;
  breed: string;
  sex: string;
}

export default function HeritageGallery() {
  const supabase = createClient();
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlock() {
      const { data, error } = await supabase
        .from('birds')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) console.error("Error fetching flock:", error);
      else setBirds(data || []);
      setLoading(false);
    }
    fetchFlock();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sanctuary-gold"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {birds.map((bird) => (
        <div key={bird.id} className="relative group h-full">
          
          {/* BLANK BOX: Awaiting Name */}
          {bird.is_available && !bird.name ? (
            <div className="h-full border-4 border-dashed border-sanctuary-gold rounded-3xl p-8 flex flex-col items-center justify-center bg-white/40 hover:bg-white/80 transition-all duration-300 shadow-inner">
              <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">🪺</div>
              <h3 className="font-serif text-xl text-sanctuary-green font-bold text-center">New Resident</h3>
              <p className="text-[10px] text-gray-500 italic mt-2 text-center uppercase tracking-widest">
                {bird.breed} ({bird.sex})
              </p>
              <div className="mt-6 w-full h-px bg-sanctuary-gold/30"></div>
              <p className="mt-4 text-[10px] text-sanctuary-green font-bold text-center leading-tight">
                NAME & CLAIM ACCESS REQUIRED
              </p>
            </div>
          ) : (
            /* NAMED CARD: With Biological Hover Overlay */
            <div className={`h-full bg-white border-2 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 group hover:border-sanctuary-gold ${bird.is_founding_four ? 'border-sanctuary-gold' : 'border-sanctuary-green'}`}>
              
              <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                {bird.image_url ? (
                  <img 
                    src={bird.image_url} 
                    alt={bird.name || "Duck"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sanctuary-green/10 text-4xl">🦆</div>
                )}
                
                {/* BIOLOGICAL HOVER OVERLAY */}
                <div className="absolute inset-0 bg-sanctuary-green/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-sanctuary-gold p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Biological Profile</p>
                  <p className="text-lg font-serif italic mb-2">{bird.breed || 'Pekin'}</p>
                  <div className="flex gap-2">
                    <span className="bg-sanctuary-gold text-sanctuary-green px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {bird.sex || 'TBD'}
                    </span>
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {bird.is_founding_four || bird.origin === 'Adopted' ? 'Gen: G0' : 'Gen: G1+'}
                    </span>
                  </div>
                </div>

                {bird.is_founding_four && (
                  <div className="absolute top-3 right-3 bg-sanctuary-gold text-sanctuary-green text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase">
                    G0 Founder
                  </div>
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className="font-serif text-3xl text-sanctuary-green mb-1">{bird.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{bird.origin} Resident</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
