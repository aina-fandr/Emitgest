
import { useState } from 'react'
import { Plus, Building, Edit3, Trash2, X } from 'lucide-react'

export default function Rooms() {
  const [showModal, setShowModal] = useState(false)
  const rooms = [
    { id: 1, name: 'Salle C101', building: 'Bâtiment C', floor: 1, capacity: 50, equipment: 'Projecteur, Tableau blanc', available: true },
    { id: 2, name: 'Salle B202', building: 'Bâtiment B', floor: 2, capacity: 80, equipment: 'Projecteur, Tableau interactif', available: true },
    { id: 3, name: 'Labo D', building: 'Bâtiment D', floor: 0, capacity: 30, equipment: 'Matériel de laboratoire', available: false },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestion des Salles</h2>
          <p className="text-slate-500 text-sm">Gérez les salles de l'université</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg">
          <Plus className="w-4 h-4" /> Ajouter une salle
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Building className="text-blue-600 w-5 h-5" />
                <h4 className="font-bold text-slate-800">{room.name}</h4>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${room.available ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {room.available ? 'Disponible' : 'Occupé'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>Bâtiment: {room.building}</p><p>Étage: {room.floor}</p>
              <p>Capacité: {room.capacity} places</p><p>Équipements: {room.equipment}</p>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-50">
              <button className="flex-1 py-2 text-[11px] font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1"><Edit3 className="w-3 h-3" /> Modifier</button>
              <button className="flex-1 py-2 text-[11px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Ajouter une salle</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom de la salle</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" placeholder="Ex: Salle A101" /></div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bâtiment</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" placeholder="Ex: Bâtiment A" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Étage</label><input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" defaultValue={0} /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Capacité</label><input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" defaultValue={30} /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Équipements</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" placeholder="Ex: Projecteur, Tableau blanc" /></div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
