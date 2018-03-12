'use strict';
module.exports = (sequelize, Sequelize) => {
  var Fight_Matches = sequelize.define('fight_matches', {
    fighter_one_id: Sequelize.STRING,
    fighter_two_id: Sequelize.STRING,
    fighter_one_wants_fight: Sequelize.BOOLEAN,
    fighter_two_wants_fight: Sequelize.BOOLEAN
  });

  // Fight_Matches.associate = function (models) {
  //   models.fightMatches.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Fight_Matches;
};