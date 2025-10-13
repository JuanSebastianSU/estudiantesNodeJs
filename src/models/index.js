const { sequelize } = require('../config/db');
const User        = require('./User')(sequelize);
const Estudiante  = require('./Estudiante')(sequelize);
const Profesor    = require('./Profesor')(sequelize);
const Curso       = require('./Curso')(sequelize);
const Aula        = require('./Aula')(sequelize);
const Matricula   = require('./Matricula')(sequelize);
const Asignacion  = require('./Asignacion')(sequelize); 

// Relaciones ya existentes de Matricula
Matricula.belongsTo(Estudiante, { foreignKey: { name: 'estudianteId', allowNull: false }, onDelete: 'CASCADE' });
Estudiante.hasMany(Matricula,   { foreignKey: 'estudianteId' });

Matricula.belongsTo(Curso,      { foreignKey: { name: 'cursoId', allowNull: false }, onDelete: 'CASCADE' });
Curso.hasMany(Matricula,        { foreignKey: 'cursoId' });

// --- NUEVAS relaciones de Asignacion ---
Asignacion.belongsTo(Curso,    { foreignKey: { name: 'cursoId', allowNull: false }, onDelete: 'CASCADE' });
Curso.hasMany(Asignacion,      { foreignKey: 'cursoId' });

Asignacion.belongsTo(Profesor, { foreignKey: { name: 'profesorId', allowNull: false }, onDelete: 'CASCADE' });
Profesor.hasMany(Asignacion,   { foreignKey: 'profesorId' });

Asignacion.belongsTo(Aula,     { foreignKey: { name: 'aulaId', allowNull: false }, onDelete: 'CASCADE' });
Aula.hasMany(Asignacion,       { foreignKey: 'aulaId' });

module.exports = {
  sequelize,
  User,
  Estudiante,
  Profesor,
  Curso,
  Aula,
  Matricula,
  Asignacion    
};
