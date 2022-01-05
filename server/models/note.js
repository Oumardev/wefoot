'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
 
    static associate(models) {
      models.notes.hasMany(models.users)
    }
  };
  note.init({
    physique: DataTypes.FLOAT,
    technique: DataTypes.FLOAT,
    frappe: DataTypes.FLOAT,
    assiduite: DataTypes.FLOAT,
    fairPlay: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'notes',
  });
  return note;
};