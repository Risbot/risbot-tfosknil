import { IDatasetsState } from '../reducers/types';
import {
  getDatasets,
  getIsInvalid,
  getIsLoading,
  getDatasetId,
} from './datasets';

describe('Datasets selectors', () => {
  test('getDatasets returns empty array when not data', () => {
    expect(
      getDatasets({
        datasets: {
          data: null,
          didInvalidate: false,
          isFetching: false,
        } as IDatasetsState,
      } as any)
    ).toEqual([]);
  });

  test('getDatasets returns data', () => {
    expect(
      getDatasets({
        datasets: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: false,
          isFetching: false,
        } as IDatasetsState,
      } as any)
    ).toEqual([{ id: 'id', name: 'name' }]);
  });

  test('getIsInvalid returns didInvalidate value', () => {
    expect(
      getIsInvalid({
        datasets: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: true,
          isFetching: false,
        } as IDatasetsState,
      } as any)
    ).toBe(true);
  });

  test('getIsLoading returns isFetching value', () => {
    expect(
      getIsLoading({
        datasets: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: false,
          isFetching: true,
        } as IDatasetsState,
      } as any)
    ).toBe(true);
  });

  test('getDatasetId returns selected dataset ID', () => {
    expect(
      getDatasetId({} as any, {
        history: {} as any,
        match: {} as any,
        location: {
          pathname: '/dataset/datasetId',
          hash: '',
          key: '',
          search: '',
          state: '',
        },
      })
    ).toEqual('datasetId');
  });
});
