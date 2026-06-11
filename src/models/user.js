/**
 * 
 * @param {import('sequelize').Sequelize} sequelise 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns {import('../../types/type.js').User}
 */
module.exports = (sequelise, DataTypes) => {
  return sequelise.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: "The username is already used",
      },
      validate: {
        notEmpty: { msg: "The username cannot be empty" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "The password is required" },
      },
    },
  });
};
