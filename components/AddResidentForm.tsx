"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AddResidentForm() {
  const supabase = createClient();
  const [origin, setOrigin] = useState<'Hatched' | 'Adopted'>('Hatched');
  const [parentId, setParentId] = useState<string>("");
  const [existingBirds, setExistingBirds] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  // Load existing birds to choose a parent
  useEffect(() => {
    async function getBirds() {
      const { data } = await supabase.from('birds').select('id, name');
      if (data) setExistingBirds(data);
    }
    getBirds();
  }, []);

  const handleHatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Hatching...");

    const { error } = await supabase.from('birds').insert([
      { 
        name: null, // Leaves it as a 'Blank Box' for a Guardian or Mighty Duck
        origin: origin,
        parent_id: origin === 'Hatched' ? parentId : null,
        is_available: true,
        is_founding_four: false
      }
    ]);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Success! A new Blank Box is now live in the Heritage Tree.");
      setParentId("");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border-2 border-sanctuary-gold shadow-xl max-w-md">
      <h3 className="text-2xl font-serif text-sanctuary-green mb-6">Register New Resident</h3>
      
      <form onSubmit={handleHatch} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Arrival Type</label>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setOrigin('Hatched')}
              className={`flex-1 py-2 rounded-lg font-bold text-xs ${origin === 'Hatched' ? 'bg-sanctuary-green text-sanctuary-gold' : 'bg-gray-100'}`}
            >
              🐣 HATCHED HERE
            </button>
            <button 
              type="button"
              onClick={() => setOrigin('Adopted')}
              className={`flex-1 py-2 rounded-lg font-bold text-xs ${origin === 'Adopted' ? 'bg-sanctuary-green text-sanctuary-gold' : 'bg-gray-100'}`}
            >
              🚜 NEW RECRUIT
            </button>
          </div>
        </div>

        {origin === 'Hatched' && (
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Select Parent (Lineage)</label>
            <select 
              className="w-full p-3 border rounded-xl outline-none focus:border-sanctuary-gold"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              required
            >
              <option value="">Select a Founding Duck...</option>
              {existingBirds.map(bird => (
                <option key={bird.id} value={bird.id}>{bird.name}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="w-full bg-sanctuary-gold text-sanctuary-green font-bold py-4 rounded-xl shadow-lg hover:bg-black hover:text-white transition-all">
          ADD TO SANCTUARY
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm font-bold text-sanctuary-green">{status}</p>}
    </div>
  );
}