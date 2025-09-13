
// Environment configuration
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000',
    SOCKET_URL: 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: 'https://projectchat-wtqh.onrender.com',
    SOCKET_URL: 'https://projectchat-wtqh.onrender.com'
  }
};

// Determine environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const environment = isDevelopment ? 'development' : 'production';

export default config[environment];
