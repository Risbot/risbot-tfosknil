import { Dataset } from '../types';
const DATASET_LIST_REQUEST = 'DATASET_LIST_REQUEST';
const DATASET_LIST_SUCCESS = 'DATASET_LIST_SUCCESS';
const DATASET_LIST_ERROR = 'DATASET_LIST_ERROR';

export interface IFetchDatasetsRequest {
  type: typeof DATASET_LIST_REQUEST;
}

export interface IFetchDatasetsSuccess {
  type: typeof DATASET_LIST_SUCCESS;
  payload: Array<Dataset>;
}

export interface IFetchDatasetsError {
  type: typeof DATASET_LIST_ERROR;
}

export type Actions =
  | IFetchDatasetsRequest
  | IFetchDatasetsSuccess
  | IFetchDatasetsError;
