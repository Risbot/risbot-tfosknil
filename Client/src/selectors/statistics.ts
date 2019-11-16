import { AppState } from '../types';

export const getStatistics = (state: AppState) => state.statistics.data;
export const getIsLoading = (state: AppState) => state.statistics.isFetching;
