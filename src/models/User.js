const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
    nombre: { type: DataTypes.STRING }
  }, { tableName: 'usuarios', timestamps: true });
  
  User.beforeValidate((user) => {
    if (user.email) user.email = String(user.email).trim().toLowerCase();
  });

  return User;
};
