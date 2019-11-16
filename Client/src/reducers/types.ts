import { Dataset } from '../types';

export interface IDatasetsState {
  data: Array<Dataset> | null;
  isFetching: boolean;
  didInvalidate: boolean;
}
