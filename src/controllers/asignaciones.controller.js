const { Asignacion, Curso, Profesor, Aula } = require('../models');
const { ROLES } = require('../config/roles');

module.exports = {

  async list(req, res) {
    try {
      const items = await Asignacion.findAll({ include: [Curso, Profesor, Aula] });
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: 'Error listando' });
    }
  },

  async create(req, res) {
    try {
      const { cursoId, profesorId, aulaId } = req.body;
      if (!cursoId || !profesorId || !aulaId) {
        return res.status(400).json({ error: 'cursoId, profesorId y aulaId son requeridos' });
      }

      const [curso, profesor, aula] = await Promise.all([
        Curso.findByPk(cursoId),
        Profesor.findByPk(profesorId),
        Aula.findByPk(aulaId)
      ]);
      if (!curso || !profesor || !aula) {
        return res.status(400).json({ error: 'Curso/Profesor/Aula inexistente(s)' });
      }

      const nuevo = await Asignacion.create({ cursoId, profesorId, aulaId, createdBy: req.user.id });
      res.status(201).json(nuevo);
    } catch (e) {
      res.status(400).json({ error: 'Error creando' });
    }
  },

  async update(req, res) {
    try {
      const item = await Asignacion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      // si te envían nuevas FKs, valida que existan
      const { cursoId, profesorId, aulaId } = req.body;
      if (cursoId || profesorId || aulaId) {
        const checks = [];
        if (cursoId)    checks.push(Curso.findByPk(cursoId));
        if (profesorId) checks.push(Profesor.findByPk(profesorId));
        if (aulaId)     checks.push(Aula.findByPk(aulaId));
        const found = await Promise.all(checks);
        if (found.some(x => x === null)) {
          return res.status(400).json({ error: 'Curso/Profesor/Aula inexistente(s)' });
        }
      }

      await item.update(req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: 'Error actualizando' });
    }
  },

  async patch(req, res) {
    try {
      const item = await Asignacion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      const esAdmin = req.user.role === ROLES.ADMIN;
      const esDueno = item.createdBy === req.user.id;
      if (!esAdmin && !esDueno) return res.status(403).json({ error: 'Sin permiso' });

      const { cursoId, profesorId, aulaId } = req.body;
      if (cursoId || profesorId || aulaId) {
        const checks = [];
        if (cursoId)    checks.push(Curso.findByPk(cursoId));
        if (profesorId) checks.push(Profesor.findByPk(profesorId));
        if (aulaId)     checks.push(Aula.findByPk(aulaId));
        const found = await Promise.all(checks);
        if (found.some(x => x === null)) {
          return res.status(400).json({ error: 'Curso/Profesor/Aula inexistente(s)' });
        }
      }

      await item.update(req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: 'Error actualizando (parcial)' });
    }
  },

  async remove(req, res) {
    try {
      if (req.user.role !== ROLES.ADMIN) return res.status(403).json({ error: 'Solo admin puede borrar' });

      const item = await Asignacion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });

      await item.destroy();
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error eliminando' });
    }
  }
};
