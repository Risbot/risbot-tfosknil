import { combineReducers } from 'redux';
import dataset from './reducers/datasets';

const reducers = combineReducers({
  dataset,
});

export default reducers;
