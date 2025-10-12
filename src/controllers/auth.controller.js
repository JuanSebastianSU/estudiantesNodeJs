const AuthService = require('../services/auth.service');

module.exports = {
  async register(req, res) {
    try {
      const data = await AuthService.register(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message || 'Error registrando' });
    }
  },
  async login(req, res) {
    try {
      const data = await AuthService.login(req.body);
      res.json(data);
    } catch (e) {
      res.status(401).json({ error: e.message || 'Error login' });
    }
  }
};
