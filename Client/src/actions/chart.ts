import { ThunkDispatch } from 'redux-thunk';
import { AppState, Chart } from '../types';
import { get } from '../helpers/api';
import {
  Actions,
  IFetchChartRequest,
  IFetchChartSuccess,
  IFetchChartError,
} from './types';

const fetchChartRequest = (): IFetchChartRequest => {
  return { type: 'CHART_REQUEST' };
};

const fetchChartSuccess = (payload: Chart): IFetchChartSuccess => {
  return { type: 'CHART_SUCCESS', payload };
};

const fetchChartError = (): IFetchChartError => {
  return { type: 'CHART_ERROR' };
};

const shouldFetchChart = (state: AppState) => {
  if (state.chart.isFetching) {
    return false;
  }
  return true;
};

const fetchChart = (datasetId: string) => async (
  dispatch: ThunkDispatch<AppState, void, Actions>
): Promise<Actions> => {
  dispatch(fetchChartRequest());
  try {
    const response = await get(`chart/${datasetId}`);
    const data = response.data;
    return dispatch(fetchChartSuccess(data));
  } catch (e) {
    return dispatch(fetchChartError());
  }
};

export const fetchChartIfNeeded = (datasetId: string) => (
  dispatch: ThunkDispatch<AppState, void, Actions>,
  getState: () => AppState
): Promise<Actions | void> => {
  if (shouldFetchChart(getState())) {
    return dispatch(fetchChart(datasetId));
  }
  return Promise.resolve();
};
