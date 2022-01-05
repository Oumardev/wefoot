'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ligneMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ligneMatches.belongsTo(models.matches)
      models.ligneMatches.belongsTo(models.users)
    }
  };
  ligneMatch.init({
    dateParticipation: DataTypes.DATE,
    matchId :  DataTypes.INTEGER,
    userId :  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ligneMatches',
  });
  return ligneMatch;
};