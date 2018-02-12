/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

import expressConfig from './config/express';
import registerRoutes from './routes';
import { setTimeout } from 'core-js/library/web/timers';

// Populate databases with sample data
if(config.seedDB) {
  require('./config/create_and_populate_tables');
}

// Setup server
var app = express();
var server = http.createServer(app);

expressConfig(app);
registerRoutes(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

function runServer(){
  sqldb.sequelize.sync()
    .then(startServer)
    .catch(err => {
      console.log('Server failed to start due to error: %s', err);
    })
  }
setTimeout(runServer, 2000)

// Expose app
exports = module.exports = app;
