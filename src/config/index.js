import 'dotenv/config'

const config = {
  // Services
  USERS_SERVICE: process.env.FRONTEND_URL,
  BACKEND_SERVICE: process.env.BACKEND_URL,
  BACKEND_SERVICE_AUTH: process.env.BACKEND_URL_AUTH,
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
