'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gerant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gerant.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.STRING,
    organisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gerants',
  });
  return gerant;
};