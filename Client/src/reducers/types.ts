import { Dataset, Statistics } from '../types';

export interface IDatasetsState {
  data: Array<Dataset> | null;
  isFetching: boolean;
  didInvalidate: boolean;
}

export interface IStatisticsState {
  data: Statistics | null;
  isFetching: boolean;
}
