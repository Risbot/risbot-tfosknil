import { getDatasets, getIsInvalid, getIsLoading } from './datasets';

describe('Datasets selectors', () => {
  test('getDatasets returns empty array when not data', () => {
    expect(
      getDatasets({
        dataset: { data: null, didInvalidate: false, isFetching: false },
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
      })
    ).toBe(true);
  });
});
