'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.matches.belongsTo(models.users)
    }
  };
  match.init({
    date: DataTypes.DATE,
    nbJoueur: DataTypes.INTEGER,
    lieux: DataTypes.STRING,
    prix: DataTypes.STRING,
    duree: DataTypes.STRING,
    mode: DataTypes.STRING,
    userId :  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'matches',
  });
  return match;
};