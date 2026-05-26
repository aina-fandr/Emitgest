import React from 'react';
import { Save } from 'lucide-react';

const InfosPr = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Section Gauche */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black mb-1">Informations personnelles</h2>
        <p className="text-slate-400 text-sm mb-8">Vos informations et préférences d'enseignement</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet</label>
            <input type="text" placeholder="Dr. Nom Prénom" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Département</label>
            <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-500">
              <option>Sélectionner un département</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Matières enseignées</label>
            <textarea placeholder="Algorithmique, Bases de données, ..." rows="4" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>

      {/* Section Droite */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col">
        <h2 className="text-2xl font-black mb-1">Accessibilité</h2>
        <p className="text-slate-400 text-sm mb-8">Contraintes d'accessibilité et besoins spéciaux</p>

        <div className="space-y-6 flex-grow">
          <label className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-xl cursor-pointer border border-indigo-100">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
            <span className="text-sm font-bold text-slate-700">J'ai des besoins d'accessibilité (mobilité réduite)</span>
          </label>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Étage maximum accessible</label>
            <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tous les étages</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Notes supplémentaires</label>
            <textarea placeholder="Précisez vos besoins..." rows="5" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100">
          <Save size={20} /> Enregistrer
        </button>
      </div>
    </div>
  );
};

export default InfosPr;