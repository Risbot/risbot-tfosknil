import { Dataset, Statistics } from '../types';
const DATASET_LIST_REQUEST = 'DATASET_LIST_REQUEST';
const DATASET_LIST_SUCCESS = 'DATASET_LIST_SUCCESS';
const DATASET_LIST_ERROR = 'DATASET_LIST_ERROR';
const DATASET_ADD_REQUEST = 'DATASET_ADD_REQUEST';
const DATASET_ADD_SUCCESS = 'DATASET_ADD_SUCCESS';
const DATASET_ADD_ERROR = 'DATASET_ADD_ERROR';
const STATISTICS_DATA_REQUEST = 'STATISTICS_DATA_REQUEST';
const STATISTICS_DATA_SUCCESS = 'STATISTICS_DATA_SUCCESS';
const STATISTICS_DATA_ERROR = 'STATISTICS_DATA_ERROR';

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

export interface IDatasetAddRequest {
  type: typeof DATASET_ADD_REQUEST;
}

export interface IDatasetAddSuccess {
  type: typeof DATASET_ADD_SUCCESS;
}

export interface IDatasetAddError {
  type: typeof DATASET_ADD_ERROR;
}

export interface IFetchStatisticsRequest {
  type: typeof STATISTICS_DATA_REQUEST;
}

export interface IFetchStatisticsSuccess {
  type: typeof STATISTICS_DATA_SUCCESS;
  payload: Statistics;
}

export interface IFetchStatisticsError {
  type: typeof STATISTICS_DATA_ERROR;
}

export interface IDatasetAddRequest {
  type: typeof DATASET_ADD_REQUEST;
}

export interface IDatasetAddSuccess {
  type: typeof DATASET_ADD_SUCCESS;
}

export interface IDatasetAddError {
  type: typeof DATASET_ADD_ERROR;
}

export type Actions =
  | IFetchDatasetsRequest
  | IFetchDatasetsSuccess
  | IFetchDatasetsError
  | IDatasetAddRequest
  | IDatasetAddSuccess
  | IDatasetAddError
  | IFetchStatisticsRequest
  | IFetchStatisticsSuccess
  | IFetchStatisticsError;
