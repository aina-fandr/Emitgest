import React from 'react';
import { Calendar, Save } from 'lucide-react';

const Emploi = () => {
  const creneaux = ["08:00-09:30", "09:45-11:15", "11:30-13:00", "14:00-15:30", "15:45-17:15", "17:30-19:00"];
  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-1">
        <Calendar className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-black">Disponibilités</h2>
      </div>
      <p className="text-slate-400 text-sm mb-8">Cliquez sur les créneaux où vous êtes disponible pour enseigner</p>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-left p-3 text-slate-400 font-medium text-sm">Créneau</th>
              {jours.map(jour => (
                <th key={jour} className="p-3 text-slate-700 font-bold text-sm">{jour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creneaux.map((time, idx) => (
              <tr key={idx}>
                <td className="p-3 text-sm font-bold text-slate-500 bg-slate-50 rounded-lg">{time}</td>
                {jours.map(j => (
                  <td key={j} className="p-0">
                    <button className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-center text-slate-300">
                      -
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <div className="w-4 h-4 bg-indigo-100 border border-indigo-200 rounded"></div> Disponible
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <div className="w-4 h-4 bg-slate-50 border border-slate-200 rounded"></div> Non disponible
          </div>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all">
          <Save size={18} /> Enregistrer les disponibilités
        </button>
      </div>
    </div>
  );
};

export default Emploi;