import { combineReducers } from 'redux';
import datasets from './reducers/datasets';
import statistics from './reducers/statistics';
import chart from './reducers/chart';

const reducers = combineReducers({
  datasets,
  statistics,
  chart,
});

export default reducers;
