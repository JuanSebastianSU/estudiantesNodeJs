const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Curso = sequelize.define('Curso', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    creditos: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdBy: { type: DataTypes.UUID }
  }, { tableName: 'cursos', timestamps: true });

  Curso.beforeValidate((c) => {
    if (c.nombre) c.nombre = String(c.nombre).trim();
  });

  return Curso;
};
