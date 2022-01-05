'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
  
    static associate(models) {
      models.notifications.belongsTo(models.users, {foreignKey: 'senderId'})
      models.notifications.belongsTo(models.users, {foreignKey: 'recipientId'})
      models.notifications.belongsTo(models.notificationTypes, {foreignKey: 'notificationTypes'})
    }
  };
  notification.init({
    read: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    senderId :  DataTypes.INTEGER,
    recipientId :  DataTypes.INTEGER,
    notificationTypes :  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notification;
};