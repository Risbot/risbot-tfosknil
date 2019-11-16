import { getStatistics, getIsLoading } from './statistics';

describe('Statistics selectors', () => {
  test('getStatistics returns data', () => {
    expect(
      getStatistics({
        dataset: {
          data: null,
          didInvalidate: false,
          isFetching: false,
        },
        statistics: { data: {}, isFetching: false },
      })
    ).toEqual({});
  });

  test('getIsLoading returns isFetching value', () => {
    expect(
      getIsLoading({
        dataset: {
          data: null,
          didInvalidate: false,
          isFetching: false,
        },
        statistics: { data: null, isFetching: true },
      })
    ).toBe(true);
  });
});
