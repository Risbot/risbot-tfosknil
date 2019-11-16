import { AppState } from '../types';

export const getDatasets = (state: AppState) => state.dataset.data || [];
export const getIsInvalid = (state: AppState) => state.dataset.didInvalidate;
export const getIsLoading = (state: AppState) => state.dataset.isFetching;
