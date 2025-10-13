const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Asignacion = sequelize.define('Asignacion', {
    id:         { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cursoId:    { type: DataTypes.UUID, allowNull: false },
    profesorId: { type: DataTypes.UUID, allowNull: false },
    aulaId:     { type: DataTypes.UUID, allowNull: false },
    createdBy:  { type: DataTypes.UUID }
  }, {
    tableName: 'asignaciones',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['cursoId', 'profesorId', 'aulaId'] }
    ]
  });

  return Asignacion;
};
