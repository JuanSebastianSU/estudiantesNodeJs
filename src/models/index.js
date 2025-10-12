const { sequelize } = require('../config/db');
const User = require('./User')(sequelize);
const Estudiante = require('./Estudiante')(sequelize);
const Profesor = require('./Profesor')(sequelize);
const Curso = require('./Curso')(sequelize);
const Aula = require('./Aula')(sequelize);
const Matricula = require('./Matricula')(sequelize);

Matricula.belongsTo(Estudiante, { foreignKey: { name: 'estudianteId', allowNull: false }, onDelete: 'CASCADE' });
Estudiante.hasMany(Matricula, { foreignKey: 'estudianteId' });

Matricula.belongsTo(Curso, { foreignKey: { name: 'cursoId', allowNull: false }, onDelete: 'CASCADE' });
Curso.hasMany(Matricula, { foreignKey: 'cursoId' });

module.exports = {
  sequelize,
  User,
  Estudiante,
  Profesor,
  Curso,
  Aula,
  Matricula
};