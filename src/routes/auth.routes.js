const express = require('express');
const ctrl = require('../controllers/auth.controller');

const router = express.Router();

// Público (no requiere token)
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

module.exports = router;
