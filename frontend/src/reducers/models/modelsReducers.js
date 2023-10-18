import list from 'reducers/models/modelsListReducers';
import form from 'reducers/models/modelsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
