const { Profesor } = require('../models');
const { ROLES } = require('../config/roles');

module.exports = {
  async list(req, res, next) {
    try {
      const items = await Profesor.findAll();
      res.json(items);
    } catch (e) { next(e); }
  },

  async create(req, res, next) {
    try {
      const data = { ...req.body, createdBy: req.user.id };
      const nuevo = await Profesor.create(data);
      res.status(201).json(nuevo);
    } catch (e) { next(e); }
  },

  async update(req, res, next) {
    try {
      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      await item.update(req.body);
      res.json(item);
    } catch (e) { next(e); }
  },

  async patch(req, res, next) {
    try {
      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      await item.update(req.body);
      res.json(item);
    } catch (e) { next(e); }
  },

  async remove(req, res, next) {
    try {
      if (req.user.role !== ROLES.ADMIN) return res.status(403).json({ error: 'Solo admin puede borrar' });

      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      await item.destroy();
      res.json({ ok: true });
    } catch (e) { next(e); }
  }
};
