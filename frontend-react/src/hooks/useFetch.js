import { useState, useEffect } from 'react'
import ApiService from '../services/apiService'

/**
 * Hook personnalisé pour récupérer des données depuis l'API
 * @param {string} endpoint - L'endpoint API à appeler
 * @param {array} dependencies - Les dépendances pour re-fetch
 * @returns {object} { data, loading, error, refetch }
 */
export const useFetch = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ApiService.get(endpoint)
      setData(result)
    } catch (err) {
      console.error('Erreur lors du fetch:', err)
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, ...dependencies])

  return { data, loading, error, refetch: fetchData }
}
