import { Actions } from '../actions/types';
import { IStatisticsState } from './types';

const initialState: IStatisticsState = {
  data: null,
  isFetching: false,
};

const statistics = (
  state = initialState,
  action: Actions
): IStatisticsState => {
  switch (action.type) {
    case 'STATISTICS_DATA_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'STATISTICS_DATA_SUCCESS':
      return {
        isFetching: false,
        data: action.payload,
      };
    case 'STATISTICS_DATA_ERROR':
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default statistics;
