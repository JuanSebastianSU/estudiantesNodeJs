const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Estudiante = sequelize.define('Estudiante', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email:  { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: true } },
    edad:   { type: DataTypes.INTEGER },
    createdBy: { type: DataTypes.UUID }
  }, { tableName: 'estudiantes', timestamps: true });

  Estudiante.beforeValidate((e) => {
    if (e.email) e.email = String(e.email).trim().toLowerCase();
  });

  return Estudiante;
};
