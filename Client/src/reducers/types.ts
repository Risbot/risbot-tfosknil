import { Dataset, Statistics, Chart } from '../types';

export interface IDatasetsState {
  data: Array<Dataset> | null;
  isFetching: boolean;
  didInvalidate: boolean;
}

export interface IStatisticsState {
  data: Statistics | null;
  isFetching: boolean;
}

export interface IChartState {
  data: Chart | null;
  isFetching: boolean;
}
