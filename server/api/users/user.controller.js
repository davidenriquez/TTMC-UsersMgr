/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  upsert
 * PATCH   /api/users/:id          ->  patch
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import { applyPatch } from 'fast-json-patch';
import {User, Privilege, UserPrivilege} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      applyPatch(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => res.status(204).end());
    }
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
  return User.findAll({
    include: [{
      model: Privilege,
      through: {
        attributes: ['privilege'],
      }
    }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  return User.find({
    include: [{
      model: Privilege,
      through: {
        attributes: ['privilege'],
      }
    }],
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {
  return User.create(req.body)
    .then(function(user){
      user.addPrivileges(req.body.privileges);
    })
    .catch(handleError(res));
}

// Upserts the given User in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }

  return User.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing User in the DB
export function patch(req, res) {
  var filter = {where: {id: parseInt(req.body.id)},include: [{ model: Privilege }]};
  if(req.body._id) {
    Reflect.deleteProperty(req.body, 'id');
  }
  return User.findOne(filter)
    .then(handleEntityNotFound(res))
    .then(function(user){
      user.updateAttributes(req.body).then(function(result){ return result; });
      if(req.body.privileges){
        user.setPrivileges(req.body.privileges).then(function (result) {  
          return result;
        });
      }
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  return User.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
