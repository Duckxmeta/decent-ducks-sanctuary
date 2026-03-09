"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

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
      // 1. ENVIRONMENTAL SAFEGUARD: Stops the build-server from crashing
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase keys not found. Check Vercel environment variables.");
        setLoading(false);
        return;
      }

      // 2. INITIALIZE CLIENT
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
          <div key={i} className="aspect-square bg-gray-200 rounded-3xl"></div>
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

          <div className="p-6">
            <h4 className="font-serif text-xl text-sanctuary-green font-bold truncate">
              {bird.name || "Unnamed Resident"}
            </h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{bird.breed}</span>
              <span className="text-[10px] font-bold text-sanctuary-gold uppercase">{bird.sex}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
