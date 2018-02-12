/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.User = db.sequelize.import('../api/users/user.model');
db.Privilege = db.sequelize.import('../api/users/privilege.model')
db.UsersPrivilege = db.sequelize.import('../api/users/usersPrivileges.model');

db.User.belongsToMany( db.Privilege, {
  through: db.UsersPrivilege,
  foreignKey: 'userID',
  otherKey: 'privilegeID'
});

db.Privilege.belongsToMany( db.User, {
  through: db.UsersPrivilege,
  foreignKey: 'privilegeID',
  otherKey: 'userID'
});

module.exports = db;
