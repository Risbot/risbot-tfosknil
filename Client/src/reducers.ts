import { combineReducers } from 'redux';
import dataset from './reducers/dataset';

const reducers = combineReducers({
  dataset,
});

export default reducers;
