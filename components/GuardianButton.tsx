"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function GuardianButton({ amount, duckName, type }: { amount: string, duckName?: string, type: 'adoption' | 'general' }) {
  const supabase = createClient();
  const [availableCount, setAvailableCount] = useState(0);

  useEffect(() => {
    async function checkInventory() {
      const { count } = await supabase
        .from('birds')
        .select('*', { count: 'exact', head: true })
        .is('name', null)
        .eq('is_available', true);
      
      setAvailableCount(count || 0);
    }
    checkInventory();
  }, [supabase]);

  const handleSupport = async () => {
    if (type === 'adoption') {
      if (availableCount === 0) {
        alert("All current residents have been named! Please consider a General Sanctuary Support donation to help us build more space for new rescues.");
        return;
      }
      if (!duckName) {
        alert("Please provide a name for your new rescue resident!");
        return;
      }
      console.log(`Processing ${amount} Adoption for: ${duckName}`);
      // Integrate Stripe/PayPal checkout here
    } else {
      console.log(`Processing ${amount} General Support for Sanctuary Growth`);
      // Integrate Stripe/PayPal checkout here
    }
  };

  return (
    <button 
      onClick={handleSupport}
      className={`w-full font-black py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest ${type === 'adoption' ? 'bg-sanctuary-gold text-sanctuary-green hover:bg-white hover:text-black' : 'bg-sanctuary-green text-sanctuary-gold hover:bg-slate-900'}`}
    >
      {type === 'adoption' ? `Adopt & Name: ${duckName || '...'}` : `Support Sanctuary Growth`}
    </button>
  );
}
