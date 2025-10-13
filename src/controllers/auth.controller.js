const AuthService = require('../services/auth.service');

module.exports = {
  async register(req, res, next) {
    try {
      const data = await AuthService.register(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e); // 
    }
  },
  async login(req, res, next) {
    try {
      const data = await AuthService.login(req.body);
      res.json(data);
    } catch (e) {

      res.status(401).json({ error: e.message || 'Error login' });
    }
  }
};
