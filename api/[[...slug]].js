const app = require('../app');
module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, ''); // /api/todos -> /todos
  return app(req, res);
};