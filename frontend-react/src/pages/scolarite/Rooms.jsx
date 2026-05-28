
import { useState, useEffect } from 'react'
import { Plus, Building, Edit3, Trash2, X, Check, AlertCircle } from 'lucide-react'
import { sallesService } from '../../api/services/sallesService'

export default function Rooms() {
  const [showModal, setShowModal] = useState(false)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    nom: '',
    batiment: '',
    etage: 0,
    capacite: 30,
    equipement: '',
    estDisponible: true
  })

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const data = await sallesService.getAll()
      setRooms(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Erreur lors du chargement des salles')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }))
  }

  const handleAddRoom = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    
    try {
      await sallesService.create(formData)
      setSuccess('Salle ajoutée avec succès')
      setFormData({ nom: '', batiment: '', etage: 0, capacite: 30, equipement: '', estDisponible: true })
      setShowModal(false)
      await loadRooms()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de l\'ajout de la salle: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditRoom = (room) => {
    setFormData(room)
    setEditingId(room.id)
    setShowModal(true)
  }

  const handleUpdateRoom = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    
    try {
      await sallesService.update(editingId, formData)
      setSuccess('Salle mise à jour avec succès')
      setFormData({ nom: '', batiment: '', etage: 0, capacite: 30, equipement: '', estDisponible: true })
      setEditingId(null)
      setShowModal(false)
      await loadRooms()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de la mise à jour: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette salle?')) return
    
    setError(null)
    try {
      await sallesService.delete(id)
      setSuccess('Salle supprimée avec succès')
      await loadRooms()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de la suppression: ' + err.message)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ nom: '', batiment: '', etage: 0, capacite: 30, equipement: '', estDisponible: true })
  }

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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" /> {success}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-500">Chargement des salles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.length === 0 ? (
            <p className="text-slate-500 col-span-3">Aucune salle trouvée</p>
          ) : (
            rooms.map(room => (
              <div key={room.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Building className="text-blue-600 w-5 h-5" />
                    <h4 className="font-bold text-slate-800">{room.nom}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${room.estDisponible ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {room.estDisponible ? 'Disponible' : 'Occupé'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>Bâtiment: {room.batiment}</p>
                  <p>Étage: {room.etage}</p>
                  <p>Capacité: {room.capacite} places</p>
                  <p>Équipements: {room.equipement || 'N/A'}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-50">
                  <button onClick={() => handleEditRoom(room)} className="flex-1 py-2 text-[11px] font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1"><Edit3 className="w-3 h-3" /> Modifier</button>
                  <button onClick={() => handleDeleteRoom(room.id)} className="flex-1 py-2 text-[11px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Supprimer</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">{editingId ? 'Modifier la salle' : 'Ajouter une salle'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={editingId ? handleUpdateRoom : handleAddRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom de la salle</label>
                <input 
                  type="text" 
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" 
                  placeholder="Ex: Salle A101" 
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bâtiment</label>
                <input 
                  type="text" 
                  name="batiment"
                  value={formData.batiment}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" 
                  placeholder="Ex: Bâtiment A" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Étage</label>
                  <input 
                    type="number" 
                    name="etage"
                    value={formData.etage}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Capacité</label>
                  <input 
                    type="number" 
                    name="capacite"
                    value={formData.capacite}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Équipements</label>
                <input 
                  type="text" 
                  name="equipement"
                  value={formData.equipement}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" 
                  placeholder="Ex: Projecteur, Tableau blanc" 
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name="estDisponible"
                  checked={formData.estDisponible}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-slate-200" 
                  id="disponible"
                />
                <label htmlFor="disponible" className="ml-2 text-sm font-medium text-slate-700">Salle disponible</label>
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
              >
                {submitting ? 'En cours...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
