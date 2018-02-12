'use strict';

module.exports = function (sequelize, DataTypes) {
  var UsersPrivilege = sequelize.define('UsersPrivileges', {
    idUserPrivilege: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: DataTypes.INTEGER,
    privilegeID: DataTypes.INTEGER
  });

  return UsersPrivilege;
}
