const { Estudiante } = require('../models');
const { ROLES } = require('../config/roles');

module.exports = {
  // Listar: todos autenticados pueden ver (ajusta si quieres filtrar por owner)
  async list(req, res) {
    try {
      const items = await Estudiante.findAll();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: 'Error listando' });
    }
  },

  // Crear: asigna owner
  async create(req, res) {
    try {
      const data = { ...req.body, createdBy: req.user.id };
      const nuevo = await Estudiante.create(data);
      res.status(201).json(nuevo);
    } catch (e) {
      res.status(400).json({ error: 'Error creando' });
    }
  },

  // PUT (reemplazo/actualización total) — admin o dueño
  async update(req, res) {
    try {
      const item = await Estudiante.findByPk(req.params.id);
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

  // PATCH (parcial) — admin o dueño
  async patch(req, res) {
    try {
      const item = await Estudiante.findByPk(req.params.id);
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

  // DELETE — solo admin (reforzamos además del middleware)
  async remove(req, res) {
    try {
      if (req.user.role !== ROLES.ADMIN) return res.status(403).json({ error: 'Solo admin puede borrar' });

      const item = await Estudiante.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      await item.destroy();
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error eliminando' });
    }
  }
};
