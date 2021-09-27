module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Pending', 'Active', 'Blocked'],
      defaultValue: 'Pending'
    },
    confirmationCode: { 
      type: Sequelize.STRING,
      unique: true },
    telephone: {
        type: Sequelize.STRING,
    },
  });

  return User;
};
