import { ThunkDispatch } from 'redux-thunk';
import { AppState, Statistics } from '../types';
import { get } from '../helpers/api';
import {
  Actions,
  IFetchStatisticsRequest,
  IFetchStatisticsSuccess,
  IFetchStatisticsError,
} from './types';

const fetchStatisticsRequest = (): IFetchStatisticsRequest => {
  return { type: 'STATISTICS_DATA_REQUEST' };
};

const fetchStatisticsSuccess = (
  payload: Statistics
): IFetchStatisticsSuccess => {
  return { type: 'STATISTICS_DATA_SUCCESS', payload };
};

const fetchStatisticsError = (): IFetchStatisticsError => {
  return { type: 'STATISTICS_DATA_ERROR' };
};

const shouldFetchStatistics = (state: AppState) => {
  if (state.statistics.isFetching) {
    return false;
  }
  return true;
};

const fetchStatistics = (datasetId: string) => async (
  dispatch: ThunkDispatch<AppState, void, Actions>
): Promise<Actions> => {
  dispatch(fetchStatisticsRequest());
  try {
    const response = await get(`statistic/${datasetId}`);
    const data = response.data;
    return dispatch(fetchStatisticsSuccess(data));
  } catch (e) {
    return dispatch(fetchStatisticsError());
  }
};

export const fetchStatisticsIfNeeded = (datasetId: string) => (
  dispatch: ThunkDispatch<AppState, void, Actions>,
  getState: () => AppState
): Promise<Actions | void> => {
  if (shouldFetchStatistics(getState())) {
    return dispatch(fetchStatistics(datasetId));
  }
  return Promise.resolve();
};
