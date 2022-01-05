'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.reservations.belongsTo(models.gerants)
    }
  };
  reservation.init({
    lieux: DataTypes.STRING,
    duree: DataTypes.STRING,
    heure: DataTypes.STRING,
    mode: DataTypes.STRING,
    prix: DataTypes.STRING,
    gerantId :  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reservations',
  });
  return reservation;
};