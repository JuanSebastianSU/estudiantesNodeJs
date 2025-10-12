const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { ROLES } = require('../config/roles');
const ctrl = require('../controllers/estudiantes.controller');

const router = express.Router();

// Todas requieren estar autenticado
router.use(requireAuth);

// CRUD + PATCH (update parcial)
router.get('/',      ctrl.list);
router.post('/',     ctrl.create);
router.put('/:id',   ctrl.update);
router.patch('/:id', ctrl.patch);

// Solo ADMIN puede borrar
router.delete('/:id', requireRole(ROLES.ADMIN), ctrl.remove);

module.exports = router;
