"use client";

import React, { useState } from 'react';
// This uses your specific template's Supabase client
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const supabase = createClient();
  const [eggs, setEggs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState({
    water: false,
    feed: false,
    security: false
  });

  const handleSync = async () => {
    setLoading(true);
    
    // This sends the data to your 'sanctuary_tasks' table in Supabase
    // It uses an 'upsert' which means: "Update the row if today's date exists, otherwise insert a new one."
    const { error } = await supabase
      .from('sanctuary_tasks')
      .upsert({ 
        date: new Date().toISOString().split('T')[0], // Sets for today's date (YYYY-MM-DD)
        water_done: tasks.water,
        feed_done: tasks.feed,
        security_sweep: tasks.security,
        eggs_collected: eggs,
        updated_at: new Date().toISOString()
      }, { onConflict: 'date' }); // Ensures we don't create duplicate rows for the same day

    setLoading(false);

    if (error) {
      console.error("Supabase Error:", error);
      alert("Error syncing to Sanctuary: " + error.message);
    } else {
      alert("Sanctuary Data Synced Successfully! 🦆");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-sanctuary-green max-w-2xl mx-auto my-10 text-sanctuary-dark">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif text-sanctuary-green font-bold">Sanctuary Log</h2>
        <span className="text-sanctuary-gold font-mono font-bold">ADMIN VIEW</span>
      </div>

      {/* 1. Egg Counter Section */}
      <div className="bg-sanctuary-cream p-6 rounded-xl border border-sanctuary-gold/30 mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-sanctuary-green">Daily Egg Count</h3>
          <p className="text-sm text-gray-500 italic font-light">Total collected today</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setEggs(Math.max(0, eggs - 1))}
            className="w-12 h-12 rounded-full bg-white border-2 border-sanctuary-green text-2xl font-bold flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            -
          </button>
          <span className="text-4xl font-mono font-bold">{eggs}</span>
          <button 
            onClick={() => setEggs(eggs + 1)}
            className="w-12 h-12 rounded-full bg-sanctuary-green text-sanctuary-gold text-2xl font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-md"
          >
            +
          </button>
        </div>
      </div>

      {/* 2. Daily Tasks Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-sanctuary-green mb-4">Leg Work Checklist</h3>
        
        {/* Fresh Water Task */}
        <label className="flex items-center p-4 bg-gray-50 rounded-lg border border-transparent hover:border-sanctuary-gold cursor-pointer transition-all">
          <input 
            type="checkbox" 
            checked={tasks.water}
            onChange={() => setTasks({...tasks, water: !tasks.water})}
            className="w-6 h-6 accent-sanctuary-green mr-4"
          />
          <span className="text-gray-700 font-medium">Fresh Water Refilled</span>
        </label>

        {/* Fresh Feed Task */}
        <label className="flex items-center p-4 bg-gray-50 rounded-lg border border-transparent hover:border-sanctuary-gold cursor-pointer transition-all">
          <input 
            type="checkbox" 
            checked={tasks.feed}
            onChange={() => setTasks({...tasks, feed: !tasks.feed})}
            className="w-6 h-6 accent-sanctuary-green mr-4"
          />
          <span className="text-gray-700 font-medium">Morning Feeding Completed</span>
        </label>

        {/* Security Sweep Task */}
        <label className="flex items-center p-4 bg-gray-50 rounded-lg border border-transparent hover:border-sanctuary-gold cursor-pointer transition-all">
          <input 
            type="checkbox" 
            checked={tasks.security}
            onChange={() => setTasks({...tasks, security: !tasks.security})}
            className="w-6 h-6 accent-sanctuary-green mr-4"
          />
          <span className="text-gray-700 font-medium">Evening Security Sweep & Lockdown</span>
        </label>
      </div>

      {/* 3. Sync Button */}
      <button 
        onClick={handleSync}
        disabled={loading}
        className={`w-full mt-10 text-sanctuary-gold py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sanctuary-green hover:bg-black'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-sanctuary-gold" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            SYNCING TO SANCTUARY...
          </span>
        ) : 'SYNC TO SANCTUARY'}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4 italic">
        Last synced: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
