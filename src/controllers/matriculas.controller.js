const { Matricula, Estudiante, Curso } = require('../models');
const { ROLES } = require('../config/roles');

module.exports = {
  async list(req, res, next) {
    try {
      const items = await Matricula.findAll({ include: [Estudiante, Curso] });
      res.json(items);
    } catch (e) { next(e); }
  },

  async create(req, res, next) {
    try {
      const { estudianteId, cursoId, fecha } = req.body;
      if (!estudianteId || !cursoId) {
        return res.status(400).json({ error: 'estudianteId y cursoId requeridos' });
      }

      const [est, cur] = await Promise.all([
        Estudiante.findByPk(estudianteId),
        Curso.findByPk(cursoId)
      ]);
      if (!est || !cur) return res.status(400).json({ error: 'Estudiante o Curso inexistente' });

      const nuevo = await Matricula.create({ estudianteId, cursoId, fecha, createdBy: req.user.id });
      res.status(201).json(nuevo);
    } catch (e) { next(e); }
  },

  async update(req, res, next) {
    try {
      const item = await Matricula.findByPk(req.params.id);
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
      const item = await Matricula.findByPk(req.params.id);
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

      const item = await Matricula.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      await item.destroy();
      res.json({ ok: true });
    } catch (e) { next(e); }
  }
};
