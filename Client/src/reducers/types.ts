import { Dataset } from '../types';

export interface DatasetStore {
  data: Dataset[] | null;
  isFetching: boolean;
  didInvalidate: boolean;
}
