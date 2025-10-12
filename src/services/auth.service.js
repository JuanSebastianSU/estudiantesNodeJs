const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../models');

const { ROLES, ALL_ROLES } = require('../config/roles');

async function register({ email, password, role = ROLES.INVITADO, nombre = '' }) {
  if (!ALL_ROLES.includes(role)) throw new Error('Role inválido');
  if (!email || !password) throw new Error('email y password requeridos');
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error('Email ya registrado');
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, role, nombre });
  return { id: user.id, email: user.email, role: user.role, nombre: user.nombre };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Credenciales inválidas');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Credenciales inválidas');
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  return { token };
}

module.exports = { register, login };
