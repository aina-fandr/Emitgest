import { useState, useEffect } from 'react'
import ApiService from '../../services/apiService'
import API_CONFIG from '../../config/api.config'

/**
 * Exemple complet d'intégration API
 * Copiez ce fichier comme base pour les autres pages
 */

export default function ExamplePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Charger les données au montage
  useEffect(() => {
    fetchItems()
  }, [])

  // 2. Fonction pour récupérer les données
  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      // Remplacez par l'endpoint réel
      const data = await ApiService.get(API_CONFIG.ENDPOINTS.ROOMS)
      setItems(data)
    } catch (err) {
      console.error('Erreur:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 3. Fonction pour ajouter un élément
  const handleAdd = async (newItem) => {
    try {
      // Remplacez par l'endpoint réel
      await ApiService.post(API_CONFIG.ENDPOINTS.ROOMS, newItem)
      await fetchItems() // Rafraîchir la liste
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur lors de l\'ajout')
    }
  }

  // 4. Fonction pour modifier un élément
  const handleUpdate = async (id, updatedItem) => {
    try {
      // Remplacez par l'endpoint réel
      await ApiService.put(`${API_CONFIG.ENDPOINTS.ROOMS}/${id}`, updatedItem)
      await fetchItems() // Rafraîchir la liste
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur lors de la modification')
    }
  }

  // 5. Fonction pour supprimer un élément
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        // Remplacez par l'endpoint réel
        await ApiService.delete(`${API_CONFIG.ENDPOINTS.ROOMS}/${id}`)
        await fetchItems() // Rafraîchir la liste
      } catch (err) {
        console.error('Erreur:', err)
        setError('Erreur lors de la suppression')
      }
    }
  }

  // 6. Affichage des états
  if (loading) return <div>Chargement...</div>
  if (error) return <div className="text-red-600">Erreur: {error}</div>
  if (!items.length) return <div>Aucune donnée</div>

  // 7. Rendu
  return (
    <div>
      <h2>Titre de la page</h2>
      {/* Affichez vos items ici */}
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.nom}</li>
        ))}
      </ul>
    </div>
  )
}
