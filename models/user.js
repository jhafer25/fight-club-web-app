module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define('user', {
    id: { 
      autoIncrement: true, 
      primaryKey: true, 
      type: Sequelize.INTEGER 
    },
    firstname: { 
      type: Sequelize.STRING, 
      notEmpty: true 
    },
    lastname: { 
      type: Sequelize.STRING, 
      notEmpty: true 
    },
    fighter_name: { 
      type: Sequelize.TEXT, 
      allowNull: false 
    },
    fighter_gender: {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: false
    },
    fighter_image: { 
      type: Sequelize.TEXT 
    },
    about: { 
      type: Sequelize.TEXT 
    },
    email: { 
      type: Sequelize.STRING, 
      validate: { isEmail: true } 
    },
    password: { 
      type: Sequelize.STRING, 
      allowNull: false 
    },
    last_login: { 
      type: Sequelize.DATE 
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  //  User.associate = function(models) {
  //   models.User.hasMany(models.Fight_Matches);
  // };

  return User;
};
