const { Profesor } = require('../models');
const { ROLES } = require('../config/roles');

module.exports = {
  async list(req, res) {
    try {
      const items = await Profesor.findAll();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: 'Error listando' });
    }
  },

  async create(req, res) {
    try {
      const data = { ...req.body, createdBy: req.user.id };
      const nuevo = await Profesor.create(data);
      res.status(201).json(nuevo);
    } catch (e) {
      res.status(400).json({ error: 'Error creando' });
    }
  },

  async update(req, res) {
    try {
      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      await item.update(req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: 'Error actualizando' });
    }
  },

  async patch(req, res) {
    try {
      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      await item.update(req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: 'Error actualizando (parcial)' });
    }
  },

  async remove(req, res) {
    try {
      if (req.user.role !== ROLES.ADMIN) return res.status(403).json({ error: 'Solo admin puede borrar' });

      const item = await Profesor.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      await item.destroy();
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error eliminando' });
    }
  }
};
