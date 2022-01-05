'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationInvite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.NotificationInvites.belongsTo(models.users, {foreignKey: 'senderId'})
      models.NotificationInvites.belongsTo(models.users, {foreignKey: 'recipientId'})
      models.NotificationInvites.belongsTo(models.notificationTypes, {foreignKey: 'notificationTypes'})
      models.NotificationInvites.belongsTo(models.matches, {foreignKey: 'matchId'})
    }
  };
  NotificationInvite.init({
    read: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    senderId: DataTypes.INTEGER,
    recipiendId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    notificationTypes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NotificationInvites',
  });
  return NotificationInvite;
};