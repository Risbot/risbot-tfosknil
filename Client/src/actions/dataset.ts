import { ThunkDispatch } from 'redux-thunk';
import { AppState, Dataset } from '../types';
import { get } from '../helpers/api';
import {
  Actions,
  FetchDatasetsRequest,
  FetchDatasetsSuccess,
  FetchDatasetsError,
} from './types';

const fetchDatasetsRequest = (): FetchDatasetsRequest => {
  return { type: 'DATASET_LIST_REQUEST' };
};

const fetchDatasetsSuccess = (
  payload: Array<Dataset>
): FetchDatasetsSuccess => {
  return { type: 'DATASET_LIST_SUCCESS', payload };
};

const fetchDatasetsError = (): FetchDatasetsError => {
  return { type: 'DATASET_LIST_ERROR' };
};

const shouldFetchDatasets = (state: AppState) => {
  if (state.dataset.isFetching) {
    return false;
  }
  return true;
};

const fetchDatasets = () => async (
  dispatch: ThunkDispatch<AppState, void, Actions>
): Promise<Actions> => {
  dispatch(fetchDatasetsRequest());
  try {
    const response = await get('dataset');
    const data = response.data;
    return dispatch(fetchDatasetsSuccess(data));
  } catch (e) {
    return dispatch(fetchDatasetsError());
  }
};

export const fetchDatasetIfNeeded = () => (
  dispatch: ThunkDispatch<AppState, void, Actions>,
  getState: () => AppState
): Promise<Actions | void> => {
  if (shouldFetchDatasets(getState())) {
    return dispatch(fetchDatasets());
  }
  return Promise.resolve();
};

/*
export const datasetAddRequest = (): DatasetAddRequest => {
  return { type: 'DATASET_ADD_REQUEST' };
};

export const datasetAddSuccess = (): DatasetAddSuccess => {
  return { type: 'DATASET_ADD_SUCCESS' };
};

export const datasetAddError = (): DatasetAddError => {
  return { type: 'DATASET_ADD_ERROR' };
};

export const createDataset = (name: string, file: string) => (
  dispatch: Dispatch<Actions>
): Promise<Actions> => {
  dispatch(datasetAddRequest());
  return postForm('dataset', { name, file })
    .then(() => dispatch(datasetAddSuccess()))
    .catch(() => dispatch(datasetAddError()));
};
*/
