/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_name',
        unique: {
          name: 'userName',
          msg: 'Username has been used',
        },
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_email',
        unique: {
          name: 'userEmail',
          msg: 'Email has been registered',
        },
        validate: {
          isEmail: {
            msg: 'Email must be valid value',
          },
        },
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_password',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    },
  );
  return User;
};
