import { Actions } from '../actions/types';
import { IDatasetsState } from './types';

const initialState: IDatasetsState = {
  data: null,
  isFetching: false,
  didInvalidate: false,
};

const datasets = (state = initialState, action: Actions): IDatasetsState => {
  switch (action.type) {
    case 'DATASET_ADD_REQUEST':
    case 'DATASET_LIST_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'DATASET_LIST_SUCCESS':
      return {
        isFetching: false,
        didInvalidate: false,
        data: action.payload,
      };
    case 'DATASET_LIST_ERROR':
    case 'DATASET_ADD_ERROR':
      return {
        ...state,
        isFetching: false,
      };
    case 'DATASET_ADD_SUCCESS':
      return {
        ...state,
        didInvalidate: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default datasets;
