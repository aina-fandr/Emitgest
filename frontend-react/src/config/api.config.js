// Configuration de l'API backend
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    CLASSES: '/api/classes',
    ROOMS: '/api/salles',
    SCHEDULE: '/api/emplois-du-temps',
    ADMIN: '/api/admin',
  },
  TIMEOUT: 5000,
};

export default API_CONFIG;
