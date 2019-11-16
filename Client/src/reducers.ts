import { combineReducers } from 'redux';
import dataset from './reducers/datasets';
import statistics from './reducers/statistics';

const reducers = combineReducers({
  dataset,
  statistics,
});

export default reducers;
