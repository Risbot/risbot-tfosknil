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
        dataset: { data: null, didInvalidate: false, isFetching: false },
        statistics: { data: null, isFetching: false },
      })
    ).toEqual([]);
  });

  test('getDatasets returns data', () => {
    expect(
      getDatasets({
        dataset: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: false,
          isFetching: false,
        },
        statistics: { data: null, isFetching: false },
      })
    ).toEqual([{ id: 'id', name: 'name' }]);
  });

  test('getIsInvalid returns didInvalidate value', () => {
    expect(
      getIsInvalid({
        dataset: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: true,
          isFetching: false,
        },
        statistics: { data: null, isFetching: false },
      })
    ).toBe(true);
  });

  test('getIsLoading returns isFetching value', () => {
    expect(
      getIsLoading({
        dataset: {
          data: [{ id: 'id', name: 'name' }],
          didInvalidate: false,
          isFetching: true,
        },
        statistics: { data: null, isFetching: false },
      })
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
