const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { ROLES } = require('../config/roles');
const ctrl = require('../controllers/asignaciones.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/',      ctrl.list);
router.post('/',     ctrl.create);
router.put('/:id',   ctrl.update);
router.patch('/:id', ctrl.patch);
router.delete('/:id', requireRole(ROLES.ADMIN), ctrl.remove);

module.exports = router;
