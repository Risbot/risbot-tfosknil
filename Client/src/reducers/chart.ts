import { Actions } from '../actions/types';
import { IChartState } from './types';

const initialState: IChartState = {
  data: null,
  isFetching: false,
};

const chart = (state = initialState, action: Actions): IChartState => {
  switch (action.type) {
    case 'CHART_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'CHART_SUCCESS':
      return {
        isFetching: false,
        data: action.payload,
      };
    case 'CHART_ERROR':
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default chart;
