import React, { useState } from 'react';
import { User, LogOut, Home, CheckCircle } from 'lucide-react';
import InfosPr from './infospr';
import Emploi from './emploi';

const ProfesseurApp = () => {
  const [activeTab, setActiveTab] = useState('infos');

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
            <User size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Espace Professeur</h1>
            <p className="text-xs text-slate-400">solofoniaina727@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100">
            <CheckCircle size={14} /> Vérifié
          </span>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition"><Home size={18} /> Accueil</button>
            <button className="flex items-center gap-1.5 hover:text-red-500 transition"><LogOut size={18} /> Déconnexion</button>
          </nav>
        </div>
      </header>

      {/* Navigation Onglets */}
      <div className="max-w-md mx-auto flex bg-slate-200/50 p-1.5 rounded-xl mb-10">
        <button 
          onClick={() => setActiveTab('infos')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'infos' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Mes Informations
        </button>
        <button 
          onClick={() => setActiveTab('emploi')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'emploi' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Mon Emploi du Temps
        </button>
      </div>

      {/* Contenu Dynamique */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'infos' ? <InfosPr /> : <Emploi />}
      </main>

      {/* Badge de marque */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs shadow-2xl">
        <span className="opacity-70">Made by</span>
        <span className="font-bold flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> Atoms
        </span>
      </div>
    </div>
  );
};

export default ProfesseurApp;