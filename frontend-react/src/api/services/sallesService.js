import { API_ENDPOINTS, apiClient } from '../config';

export const sallesService = {
  // Get all rooms
  getAll: async () => {
    try {
      return await apiClient.get(API_ENDPOINTS.SALLES);
    } catch (error) {
      console.error('Error fetching salles:', error);
      return [];
    }
  },

  // Get a single room by ID
  getById: async (id) => {
    try {
      return await apiClient.get(API_ENDPOINTS.GET_SALLE(id));
    } catch (error) {
      console.error(`Error fetching salle ${id}:`, error);
      return null;
    }
  },

  // Create a new room
  create: async (salleData) => {
    try {
      return await apiClient.post(API_ENDPOINTS.SALLES, salleData);
    } catch (error) {
      console.error('Error creating salle:', error);
      throw error;
    }
  },

  // Update a room
  update: async (id, salleData) => {
    try {
      return await apiClient.put(API_ENDPOINTS.GET_SALLE(id), salleData);
    } catch (error) {
      console.error(`Error updating salle ${id}:`, error);
      throw error;
    }
  },

  // Delete a room
  delete: async (id) => {
    try {
      return await apiClient.delete(API_ENDPOINTS.GET_SALLE(id));
    } catch (error) {
      console.error(`Error deleting salle ${id}:`, error);
      throw error;
    }
  },
};
