import { RouteChildrenProps } from 'react-router';
import { AppState } from '../types';

export const getDatasets = (state: AppState) => state.datasets.data || [];
export const getIsInvalid = (state: AppState) => state.datasets.didInvalidate;
export const getIsLoading = (state: AppState) => state.datasets.isFetching;
export const getDatasetId = (state: AppState, props: RouteChildrenProps) => {
  const matches = props.location.pathname.split('/');
  if (matches.length === 3) {
    return matches[2];
  }
  return null;
};
