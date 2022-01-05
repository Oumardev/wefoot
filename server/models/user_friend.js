'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user_friends.belongsTo(models.users, {foreignKey: 'sourceId'})
      models.user_friends.belongsTo(models.users, {foreignKey: 'TargetId'})
    }
  };
  user_friend.init({
    status: DataTypes.STRING,
    sourceId :  DataTypes.INTEGER,
    TargetId :  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_friends',
  });
  return user_friend;
};