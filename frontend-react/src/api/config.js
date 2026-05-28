// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5222/api';

export const API_ENDPOINTS = {
  // Classes
  CLASSES: `${API_BASE_URL}/Classes`,
  GET_CLASS: (id) => `${API_BASE_URL}/Classes/${id}`,
  
  // Rooms/Salles
  SALLES: `${API_BASE_URL}/Salles`,
  GET_SALLE: (id) => `${API_BASE_URL}/Salles/${id}`,
  
  // Emploi du temps
  EMPLOIS_DU_TEMPS: `${API_BASE_URL}/EmploisDuTemps`,
  GET_EMPLOI: (id) => `${API_BASE_URL}/EmploisDuTemps/${id}`,
  
  // Admin
  ADMINS: `${API_BASE_URL}/Admins`,
  GET_ADMIN: (id) => `${API_BASE_URL}/Admins/${id}`,
};

// Fetch wrapper with error handling
export const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Convenience methods
export const apiClient = {
  get: (url) => fetchAPI(url, { method: 'GET' }),
  post: (url, data) => fetchAPI(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => fetchAPI(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => fetchAPI(url, { method: 'DELETE' }),
};
