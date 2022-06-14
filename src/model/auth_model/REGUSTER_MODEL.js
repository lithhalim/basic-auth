
const {DataTypes}=require("sequelize")
const LITH_DATABASE=require("../../database/LITH_DATABASE")
module.exports = LITH_DATABASE.define('authJwt', {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    token: {
      type: DataTypes.VIRTUAL,
    }

  }, {
    // Other model options go here
  });
  