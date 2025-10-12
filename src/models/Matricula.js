const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Matricula = sequelize.define('Matricula', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    createdBy:{ type: DataTypes.UUID } 
  }, { tableName: 'matriculas', timestamps: true });
  return Matricula;
};
