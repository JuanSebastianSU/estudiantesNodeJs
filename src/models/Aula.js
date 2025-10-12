const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Aula = sequelize.define('Aula', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    capacidad: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdBy:{ type: DataTypes.UUID }// <- NUEVO
  }, { tableName: 'aulas', timestamps: true });
  return Aula;
};
