const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Estudiante = sequelize.define('Estudiante', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    createdBy:{ type: DataTypes.UUID } // <- NUEVO
  }, { tableName: 'estudiantes', timestamps: true });
  return Estudiante;
};
