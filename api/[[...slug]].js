const app = require('../app');

// Redirige /api/* vers les routes Express, en retirant le /api
module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, '');
  return app(req, res);
};
