import { Actions } from '../actions/types';
import { DatasetStore } from './types';

const initialState: DatasetStore = {
  data: null,
  isFetching: false,
  didInvalidate: false,
};

const dataset = (state = initialState, action: Actions): DatasetStore => {
  switch (action.type) {
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
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default dataset;
