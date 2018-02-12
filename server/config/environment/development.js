'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // Sequelize connection opions
  sequelize: {
    uri:  'mysql://root@localhost:3306/ttmc',
    options: {
      logging: false,
      storage: 'dev.mysql',
      define: {
        timestamps: false
      }
    }
  },

    // Seed database on startup
  seedDB: true
};
