import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import orders from 'reducers/orders/ordersReducers';

import models from 'reducers/models/modelsReducers';

import roles from 'reducers/roles/rolesReducers';

import permissions from 'reducers/permissions/permissionsReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    orders,

    models,

    roles,

    permissions,
  });
