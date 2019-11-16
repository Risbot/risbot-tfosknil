import { ThunkDispatch } from 'redux-thunk';
import { AppState, Dataset } from '../types';
import { get, post } from '../helpers/api';
import {
  Actions,
  IFetchDatasetsRequest,
  IFetchDatasetsSuccess,
  IFetchDatasetsError,
  IDatasetAddRequest,
  IDatasetAddSuccess,
  IDatasetAddError,
} from './types';

const fetchDatasetsRequest = (): IFetchDatasetsRequest => {
  return { type: 'DATASET_LIST_REQUEST' };
};

const fetchDatasetsSuccess = (
  payload: Array<Dataset>
): IFetchDatasetsSuccess => {
  return { type: 'DATASET_LIST_SUCCESS', payload };
};

const fetchDatasetsError = (): IFetchDatasetsError => {
  return { type: 'DATASET_LIST_ERROR' };
};

const datasetAddRequest = (): IDatasetAddRequest => {
  return { type: 'DATASET_ADD_REQUEST' };
};

const datasetAddSuccess = (): IDatasetAddSuccess => {
  return { type: 'DATASET_ADD_SUCCESS' };
};

const datasetAddError = (): IDatasetAddError => {
  return { type: 'DATASET_ADD_ERROR' };
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

export const fetchDatasetsIfNeeded = () => (
  dispatch: ThunkDispatch<AppState, void, Actions>,
  getState: () => AppState
): Promise<Actions | void> => {
  if (shouldFetchDatasets(getState())) {
    return dispatch(fetchDatasets());
  }
  return Promise.resolve();
};

export const createDataset = (name: string, file: File) => async (
  dispatch: ThunkDispatch<AppState, void, Actions>
): Promise<Actions> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', file);
  dispatch(datasetAddRequest());
  try {
    await post('dataset', formData);
    return dispatch(datasetAddSuccess());
  } catch (e) {
    return dispatch(datasetAddError());
  }
};
