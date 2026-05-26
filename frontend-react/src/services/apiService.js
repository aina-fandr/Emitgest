import API_CONFIG from '../config/api.config';

class ApiService {
  /**
   * Efectue une requête GET
   * @param {string} endpoint - L'endpoint de l'API
   * @returns {Promise} La réponse JSON
   */
  static async get(endpoint) {
    try {
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      console.log('GET request to:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erreur ${response.status}: ${response.statusText} - ${errorData}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur GET:', error);
      throw error;
    }
  }

  /**
   * Effectue une requête POST
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} data - Les données à envoyer
   * @returns {Promise} La réponse JSON
   */
  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur POST:', error);
      throw error;
    }
  }

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - L'endpoint de l'API
   * @param {object} data - Les données à mettre à jour
   * @returns {Promise} La réponse JSON
   */
  static async put(endpoint, data) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur PUT:', error);
      throw error;
    }
  }

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - L'endpoint de l'API
   * @returns {Promise} La réponse JSON
   */
  static async delete(endpoint) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur DELETE:', error);
      throw error;
    }
  }

  // ============================================
  // MÉTHODES SPÉCIFIQUES POUR LES SALLES
  // ============================================

  /**
   * Récupère toutes les salles
   * @returns {Promise<Array>} Liste des salles
   */
  static async getAllRooms() {
    return this.get(API_CONFIG.ENDPOINTS.ROOMS);
  }

  /**
   * Récupère une salle par ID
   * @param {number} id - ID de la salle
   * @returns {Promise<Object>} Données de la salle
   */
  static async getRoomById(id) {
    return this.get(`${API_CONFIG.ENDPOINTS.ROOMS}/${id}`);
  }

  /**
   * Crée une nouvelle salle
   * @param {Object} roomData - Données de la salle
   * @returns {Promise<Object>} Salle créée
   */
  static async createRoom(roomData) {
    return this.post(API_CONFIG.ENDPOINTS.ROOMS, roomData);
  }

  /**
   * Met à jour une salle
   * @param {number} id - ID de la salle
   * @param {Object} roomData - Nouvelles données
   * @returns {Promise<Object>} Salle mise à jour
   */
  static async updateRoom(id, roomData) {
    return this.put(`${API_CONFIG.ENDPOINTS.ROOMS}/${id}`, roomData);
  }

  /**
   * Supprime une salle
   * @param {number} id - ID de la salle
   * @returns {Promise} Réponse de suppression
   */
  static async deleteRoom(id) {
    return this.delete(`${API_CONFIG.ENDPOINTS.ROOMS}/${id}`);
  }

  // ============================================
  // MÉTHODES SPÉCIFIQUES POUR LES CLASSES
  // ============================================

  /**
   * Récupère toutes les classes
   * @returns {Promise<Array>} Liste des classes
   */
  static async getAllClasses() {
    return this.get(API_CONFIG.ENDPOINTS.CLASSES);
  }

  /**
   * Récupère une classe par ID
   * @param {number} id - ID de la classe
   * @returns {Promise<Object>} Données de la classe
   */
  static async getClassById(id) {
    return this.get(`${API_CONFIG.ENDPOINTS.CLASSES}/${id}`);
  }

  /**
   * Crée une nouvelle classe
   * @param {Object} classData - Données de la classe
   * @returns {Promise<Object>} Classe créée
   */
  static async createClass(classData) {
    return this.post(API_CONFIG.ENDPOINTS.CLASSES, classData);
  }

  /**
   * Met à jour une classe
   * @param {number} id - ID de la classe
   * @param {Object} classData - Nouvelles données
   * @returns {Promise<Object>} Classe mise à jour
   */
  static async updateClass(id, classData) {
    return this.put(`${API_CONFIG.ENDPOINTS.CLASSES}/${id}`, classData);
  }

  /**
   * Supprime une classe
   * @param {number} id - ID de la classe
   * @returns {Promise} Réponse de suppression
   */
  static async deleteClass(id) {
    return this.delete(`${API_CONFIG.ENDPOINTS.CLASSES}/${id}`);
  }
}

export default ApiService;
