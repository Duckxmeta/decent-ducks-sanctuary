"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const supabase = createClient();
  
  // State for Birds
  const [birds, setBirds] = useState<any[]>([]);
  const [origin, setOrigin] = useState<'Hatched' | 'Adopted'>('Hatched');
  const [parent1, setParent1] = useState("");
  const [parent2, setParent2] = useState("");
  const [breed, setBreed] = useState("Pekin");
  const [sex, setSex] = useState("TBD");
  
  // State for Daily Logs
  const [logId, setLogId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    water_filled: false,
    feed_refilled: false,
    coop_cleaned: false,
    health_check: false
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    // 1. Get Birds
    const { data: birdData } = await supabase.from('birds').select('*').order('created_at', { ascending: false });
    if (birdData) setBirds(birdData);

    // 2. Get today's log or create one
    const today = new Date().toISOString().split('T')[0];
    let { data: logData } = await supabase.from('daily_care_logs').select('*').eq('date', today).single();
    
    if (!logData) {
      const { data: newLog } = await supabase.from('daily_care_logs').insert([{ date: today }]).select().single();
      logData = newLog;
    }
    
    if (logData) {
      setLogId(logData.id);
      setChecklist({
        water_filled: logData.water_filled,
        feed_refilled: logData.feed_refilled,
        coop_cleaned: logData.coop_cleaned,
        health_check: logData.health_check
      });
    }
  }

  // Handle Checklist Sync
  const toggleTask = async (task: keyof typeof checklist) => {
    const newValue = !checklist[task];
    setChecklist(prev => ({ ...prev, [task]: newValue }));
    
    await supabase.from('daily_care_logs').update({ [task]: newValue, updated_at: new Date() }).eq('id', logId);
  };

  // Add New Bird
  const handleAddBird = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Syncing lineage...");
    const { error } = await supabase.from('birds').insert([{ 
      name: null, origin, parent_id: parent1 || null, parent_id_2: parent2 || null, breed, sex, is_available: true, is_founding_four: false 
    }]);
    if (error) setStatus("Error: " + error.message);
    else {
      setStatus("Success! Resident added.");
      fetchInitialData();
    }
  };

  // Delete Bird
  const deleteBird = async (id: string) => {
    if (confirm("Are you sure? This will remove the bird from the Heritage Tree.")) {
      await supabase.from('birds').delete().eq('id', id);
      fetchInitialData();
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="bg-slate-900 p-8 rounded-[2.5rem] border-2 border-sanctuary-gold shadow-2xl">
        <h2 className="text-3xl font-serif text-sanctuary-gold mb-2 uppercase">Sanctuary Admin Profile</h2>
        <p className="text-gray-400 text-sm italic">Live Updates from Nashville, TN</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LIVE CHECKLIST */}
        <section className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-100 h-fit">
          <h3 className="font-black text-gray-400 uppercase text-[10px] mb-6 tracking-widest">Morning Rounds Checklist</h3>
          <div className="space-y-4">
            {Object.entries(checklist).map(([key, value]) => (
              <button 
                key={key}
                onClick={() => toggleTask(key as any)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${value ? 'bg-sanctuary-green border-sanctuary-green text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
              >
                <span className="font-bold text-xs uppercase">{key.replace('_', ' ')}</span>
                <span className="text-lg">{value ? '✓' : '○'}</span>
              </button>
            ))}
          </div>
        </section>

        {/* REGISTRATION FORM */}
        <section className="lg:col-span-2 bg-slate-900 p-8 rounded-[3rem] border-2 border-sanctuary-gold shadow-2xl">
          <h3 className="text-xl font-bold text-sanctuary-gold mb-8 uppercase tracking-widest text-center">Register New Resident</h3>
          <form onSubmit={handleAddBird} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <input type="text" value={breed} onChange={e => setBreed(e.target.value)} className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white outline-none focus:border-sanctuary-gold" placeholder="Breed" />
              <select className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white" value={sex} onChange={e => setSex(e.target.value)}>
                <option value="TBD">Sex: TBD</option>
                <option value="Hen">Hen</option>
                <option value="Drake">Drake</option>
              </select>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOrigin('Hatched')} className={`flex-1 py-3 rounded-xl font-bold ${origin==='Hatched' ? 'bg-sanctuary-gold text-sanctuary-green' : 'bg-slate-800 text-slate-500'}`}>HATCHED</button>
                <button type="button" onClick={() => setOrigin('Adopted')} className={`flex-1 py-3 rounded-xl font-bold ${origin==='Adopted' ? 'bg-sanctuary-gold text-sanctuary-green' : 'bg-slate-800 text-slate-500'}`}>RECRUIT</button>
              </div>
            </div>
            <div className="space-y-6">
              {origin === 'Hatched' && (
                <select className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white" value={parent1} onChange={e => setParent1(e.target.value)}>
                  <option value="">Select Parent...</option>
                  {birds.filter(b => b.name).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              )}
              <button type="submit" className="w-full bg-sanctuary-gold text-sanctuary-green font-black py-6 rounded-2xl hover:bg-white transition-all uppercase tracking-widest mt-auto">Create Blank Box</button>
            </div>
          </form>
        </section>
      </div>

      {/* FLOCK MANAGEMENT TABLE */}
      <section className="bg-white p-8 rounded-[3rem] shadow-xl border-2 border-gray-100 overflow-hidden">
        <h3 className="text-xl font-serif text-sanctuary-green font-bold mb-8">Flock Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Resident</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Breed</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Sex</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {birds.map(bird => (
                <tr key={bird.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-bold text-sanctuary-green">{bird.name || "Awaiting Name..."}</td>
                  <td className="py-4 text-sm italic text-gray-500">{bird.breed}</td>
                  <td className="py-4 text-xs font-bold uppercase">{bird.sex}</td>
                  <td className="py-4">
                    <button onClick={() => deleteBird(bird.id)} className="text-red-400 hover:text-red-600 font-black text-[10px] uppercase">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
