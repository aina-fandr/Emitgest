import { API_ENDPOINTS, apiClient } from '../config';

export const classesService = {
  // Get all classes
  getAll: async () => {
    try {
      return await apiClient.get(API_ENDPOINTS.CLASSES);
    } catch (error) {
      console.error('Error fetching classes:', error);
      return [];
    }
  },

  // Get a single class by ID
  getById: async (id) => {
    try {
      return await apiClient.get(API_ENDPOINTS.GET_CLASS(id));
    } catch (error) {
      console.error(`Error fetching class ${id}:`, error);
      return null;
    }
  },

  // Create a new class
  create: async (classData) => {
    try {
      return await apiClient.post(API_ENDPOINTS.CLASSES, classData);
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  },

  // Update a class
  update: async (id, classData) => {
    try {
      return await apiClient.put(API_ENDPOINTS.GET_CLASS(id), classData);
    } catch (error) {
      console.error(`Error updating class ${id}:`, error);
      throw error;
    }
  },

  // Delete a class
  delete: async (id) => {
    try {
      return await apiClient.delete(API_ENDPOINTS.GET_CLASS(id));
    } catch (error) {
      console.error(`Error deleting class ${id}:`, error);
      throw error;
    }
  },
};
