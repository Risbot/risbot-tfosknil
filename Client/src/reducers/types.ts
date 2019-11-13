import { Dataset } from '../types';

export interface IDatasetStore {
  data: Array<Dataset> | null;
  isFetching: boolean;
  didInvalidate: boolean;
}
