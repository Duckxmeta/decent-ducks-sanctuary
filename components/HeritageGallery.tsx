import React from 'react';

const foundingFlock = [
  {
    name: "Joey",
    title: "Alpha Drake",
    breed: "Buff Orpington",
    heritage: "G0 - Founding Member",
    bio: "The leader of the yard. Calm, protective, and the heart of the sanctuary.",
    image: "/images/joey.png",
    partner: "Solana Strays"
  },
  {
    name: "Cutie Pie",
    title: "The Heartthrob",
    breed: "Swedish Blue",
    heritage: "G0 - Founding Member",
    bio: "Known for his striking blue feathers and gentle nature toward the hens.",
    image: "/images/cutiepie.png",
    partner: "Quakey"
  },
  {
    name: "Jordie",
    title: "The Runner",
    breed: "Runner Hen",
    heritage: "G0 - Founding Member",
    bio: "Fast, alert, and always the first to find a snack in the grass.",
    image: "/images/jordie.jpg",
    partner: "QuakkPakk"
  },
  {
    name: "Huey",
    title: "The Matriarch",
    breed: "Buff Orpington",
    heritage: "G0 - Founding Member",
    bio: "A golden beauty with a calm spirit, representing the heart of the flock.",
    image: "/images/huey.png",
    partner: "SolGods"
  }
];

export default function HeritageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
      {foundingFlock.map((duck) => (
        <div key={duck.name} className="bg-white border-t-4 border-sanctuary-gold rounded-b-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
          
          {/* Image Section */}
          <div className="h-72 overflow-hidden relative">
            <img 
              src={duck.image} 
              alt={duck.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-sanctuary-green/90 text-sanctuary-gold text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              {duck.partner}
            </div>
          </div>
          
          {/* Text Content Section */}
          <div className="p-6">
            <h3 className="text-2xl font-serif text-sanctuary-green font-bold">{duck.name}</h3>
            <p className="text-sanctuary-gold text-sm font-bold mb-2 uppercase tracking-widest">{duck.heritage}</p>
            <p className="text-gray-600 text-sm mb-4 italic">{duck.breed} • {duck.title}</p>
            <p className="text-gray-700 text-sm leading-relaxed">{duck.bio}</p>
            
            <button className="mt-6 w-full border border-sanctuary-green text-sanctuary-green py-2 rounded font-bold hover:bg-sanctuary-green hover:text-white transition">
              View Lineage Tree
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
