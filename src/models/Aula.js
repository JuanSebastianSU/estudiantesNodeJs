const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Aula = sequelize.define('Aula', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    capacidad: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdBy: { type: DataTypes.UUID }
  }, { tableName: 'aulas', timestamps: true });

  Aula.beforeValidate((a) => {
    if (a.nombre) a.nombre = String(a.nombre).trim();
  });

  return Aula;
};
