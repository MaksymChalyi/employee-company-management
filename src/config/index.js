const config = {
  // Services
  USERS_SERVICE: process.env.REACT_APP_FRONTEND_URL,
  BACKEND_SERVICE: process.env.REACT_APP_BACKEND_URL,
  BACKEND_SERVICE_AUTH: process.env.REACT_APP_BACKEND_URL_AUTH,
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
