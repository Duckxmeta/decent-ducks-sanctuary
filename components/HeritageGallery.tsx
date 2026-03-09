"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Defining the Bird type to prevent TypeScript "any" errors during build
interface Bird {
  id: string;
  name: string | null;
  breed: string;
  sex: string;
  origin: string;
  is_founding_four: boolean;
  image_url?: string;
}

export default function HeritageGallery() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBirds = async () => {
      // We initialize the client inside the hook so Vercel doesn't 
      // crash during the "prerendering" phase of the build.
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from('birds')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setBirds(data);
      } catch (err) {
        console.error("Error fetching flock:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBirds();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-3xl border-2 border-dashed border-gray-300"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {birds.map((bird) => (
        <div 
          key={bird.id} 
          className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-gray-100 hover:border-sanctuary-gold transition-all duration-500 transform hover:-translate-y-2"
        >
          {/* Bird Image / Placeholder */}
          <div className="aspect-square bg-sanctuary-cream overflow-hidden relative">
            <img 
              src={bird.image_url || '/images/DDSlogo.png'} 
              alt={bird.name || "Rescue Duck"} 
              className={`w-full h-full object-cover transition-all duration-700 ${bird.name ? 'grayscale-0' : 'grayscale opacity-40'}`}
            />
            {bird.is_founding_four && (
              <div className="absolute top-4 left-4 bg-sanctuary-gold text-sanctuary-green text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                G0 Founder
              </div>
            )}
          </div>

          {/* Bird Info Overlay */}
          <div className="p-6">
            <h4 className="font-serif text-xl text-sanctuary-green font-bold truncate">
              {bird.name || "Unnamed Resident"}
            </h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{bird.breed}</span>
              <span className="text-[10px] font-bold text-sanctuary-gold uppercase">{bird.sex}</span>
            </div>
            
            {/* Detailed hover info */}
            <div className="mt-4 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                Origin: <span className="text-sanctuary-green">{bird.origin}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
