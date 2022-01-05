'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.users.belongsTo(models.notes)
      //this.belongsToMany(reservations, {foreignKey:'idReservation',through: 'ligneReservations'});
      //models.users.belongsToMany(models.matches, {foreignKey:'idMatch',through: 'ligneMatchs'});
    }
    toJSON(){
      return {...this.get(), password : undefined}
    }
  };
  user.init({
    login: {type: DataTypes.STRING, unique : true},
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.STRING,
    noteId :  DataTypes.INTEGER,
    atNaiss: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return user;
};