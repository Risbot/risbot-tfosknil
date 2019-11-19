import { AppState } from '../types';

export const getChart = (state: AppState) => state.chart.data;
export const getIsLoading = (state: AppState) => state.chart.isFetching;
