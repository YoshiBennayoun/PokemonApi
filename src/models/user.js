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
        msg: "le nom de l'utilisateur est déjà utilisé",
      },
      validate: {
        notEmpty: { msg: "le nom de l'utilisateur ne doit pas être vide" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "le mot de passe est obligatoire" },
      },
    },
  });
};
