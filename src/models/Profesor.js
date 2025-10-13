const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Profesor = sequelize.define('Profesor', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING },
    createdBy: { type: DataTypes.UUID }
  }, {
    tableName: 'profesores',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['nombre', 'especialidad'] }
    ]
  });
  return Profesor;
};
