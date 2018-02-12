/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/privileges            ->  index
 */

'use strict';

import { applyPatch } from 'fast-json-patch';
import {Privilege} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Users
export function index(req, res) {
  return Privilege.findAll({
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
