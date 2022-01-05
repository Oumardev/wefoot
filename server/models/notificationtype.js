'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notificationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notificationType.init({
    description: DataTypes.STRING,
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notificationTypes',
  });
  return notificationType;
};