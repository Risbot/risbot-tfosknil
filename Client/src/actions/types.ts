import { Dataset } from '../types';
const DATASET_LIST_REQUEST = 'DATASET_LIST_REQUEST';
const DATASET_LIST_SUCCESS = 'DATASET_LIST_SUCCESS';
const DATASET_LIST_ERROR = 'DATASET_LIST_ERROR';

export interface FetchDatasetsRequest {
  type: typeof DATASET_LIST_REQUEST;
}

export interface FetchDatasetsSuccess {
  type: typeof DATASET_LIST_SUCCESS;
  payload: Array<Dataset>;
}

export interface FetchDatasetsError {
  type: typeof DATASET_LIST_ERROR;
}

export type Actions =
  | FetchDatasetsRequest
  | FetchDatasetsSuccess
  | FetchDatasetsError;
