const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:1000',  // вказуйте ваш сервер тут
        changeOrigin: true,
    }));
};