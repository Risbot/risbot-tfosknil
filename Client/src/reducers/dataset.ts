import { Actions } from '../actions/types';
import { IDatasetStore } from './types';

const initialState: IDatasetStore = {
  data: null,
  isFetching: false,
  didInvalidate: false,
};

const dataset = (state = initialState, action: Actions): IDatasetStore => {
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
