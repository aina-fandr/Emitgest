
import { useState, useEffect } from 'react'
import { Plus, Building, Edit3, Trash2, X } from 'lucide-react'
import ApiService from '../../services/apiService'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [notification, setNotification] = useState(null)
  const [formData, setFormData] = useState({
    nom: '',
    batiment: '',
    etage: 0,
    capacite: 30,
    equipement: '',
    estDisponible: true
  })

  // Charger les salles au montage du composant
  useEffect(() => {
    fetchRooms()
  }, [])

  // Récupérer toutes les salles
  const fetchRooms = async () => {
    try {
      setLoading(true)
      const data = await ApiService.getAllRooms()
      setRooms(data)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement des salles:', err)
      setError('Erreur lors du chargement des salles')
      showNotification('Erreur: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Afficher notification
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Ouvrir le modal pour ajouter
  const handleAddClick = () => {
    setEditingId(null)
    setFormData({
      nom: '',
      batiment: '',
      etage: 0,
      capacite: 30,
      equipement: '',
      estDisponible: true
    })
    setShowModal(true)
  }

  // Ouvrir le modal pour modifier
  const handleEditClick = (room) => {
    setEditingId(room.id)
    setFormData({
      nom: room.nom,
      batiment: room.batiment,
      etage: room.etage,
      capacite: room.capacite,
      equipement: room.equipement || '',
      estDisponible: room.estDisponible !== false
    })
    setShowModal(true)
  }

  // Gérer les changements du formulaire
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'etage' || name === 'capacite' ? parseInt(value) : value
    }))
  }

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.nom.trim() || !formData.batiment.trim() || formData.capacite <= 0) {
      showNotification('Veuillez remplir tous les champs requis', 'error')
      return
    }

    try {
      if (editingId) {
        // Modifier une salle
        await ApiService.updateRoom(editingId, formData)
        showNotification('Salle modifiée avec succès', 'success')
      } else {
        // Créer une nouvelle salle
        await ApiService.createRoom(formData)
        showNotification('Salle créée avec succès', 'success')
      }
      setShowModal(false)
      fetchRooms()
    } catch (err) {
      console.error('Erreur:', err)
      showNotification('Erreur: ' + err.message, 'error')
    }
  }

  // Supprimer une salle
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette salle?')) {
      return
    }

    try {
      await ApiService.deleteRoom(id)
      showNotification('Salle supprimée avec succès', 'success')
      fetchRooms()
    } catch (err) {
      console.error('Erreur:', err)
      showNotification('Erreur: ' + err.message, 'error')
    }
  }

  return (
    <div className="space-y-8">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestion des Salles</h2>
          <p className="text-slate-500 text-sm">Gérez les salles de l'université</p>
        </div>
        <button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg">
          <Plus className="w-4 h-4" /> Ajouter une salle
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-slate-500">Chargement des salles...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms && rooms.map(room => (
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
              <p>Équipements: {room.equipement || 'Non spécifiés'}</p>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-50">
              <button onClick={() => handleEditClick(room)} className="flex-1 py-2 text-[11px] font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1"><Edit3 className="w-3 h-3" /> Modifier</button>
              <button onClick={() => handleDelete(room.id)} className="flex-1 py-2 text-[11px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? 'Modifier la salle' : 'Ajouter une salle'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom de la salle *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleFormChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-400" placeholder="Ex: Salle A101" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bâtiment *</label>
                <input type="text" name="batiment" value={formData.batiment} onChange={handleFormChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-400" placeholder="Ex: Bâtiment A" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Étage *</label>
                  <input type="number" name="etage" value={formData.etage} onChange={handleFormChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-400" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Capacité *</label>
                  <input type="number" name="capacite" value={formData.capacite} onChange={handleFormChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-400" min="1" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Équipements</label>
                <input type="text" name="equipement" value={formData.equipement} onChange={handleFormChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-400" placeholder="Ex: Projecteur, Tableau blanc" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="available" name="estDisponible" checked={formData.estDisponible} onChange={handleFormChange} className="w-4 h-4 rounded border-slate-300" />
                <label htmlFor="available" className="ml-2 text-xs font-medium text-slate-600">Disponible</label>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all">
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
