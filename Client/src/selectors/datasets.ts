import { RouteChildrenProps } from 'react-router';
import { AppState } from '../types';

export const getDatasets = (state: AppState) => state.dataset.data || [];
export const getIsInvalid = (state: AppState) => state.dataset.didInvalidate;
export const getIsLoading = (state: AppState) => state.dataset.isFetching;
export const getDatasetId = (state: AppState, props: RouteChildrenProps) => {
  const matches = props.location.pathname.split('/');
  if (matches.length === 3) {
    return matches[2];
  }
  return null;
};
