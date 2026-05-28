import { API_ENDPOINTS, apiClient } from '../config';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      return await apiClient.post(`${API_ENDPOINTS.ADMINS}/login`, {
        email,
        password,
      });
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    // Clear any stored authentication tokens/data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get stored user data
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Store authentication token
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // Store user data
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
