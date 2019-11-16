import statistics from './statistics';

describe('Statistics reducer', () => {
  describe('fetching statistics', () => {
    test('starts', () => {
      expect(
        statistics(
          { data: null, isFetching: false },
          {
            type: 'STATISTICS_DATA_REQUEST',
          }
        )
      ).toEqual({
        data: null,
        isFetching: true,
      });
    });

    test('finishes', () => {
      expect(
        statistics(
          { data: null, isFetching: true },
          {
            type: 'STATISTICS_DATA_SUCCESS',
            payload: [],
          }
        )
      ).toEqual({
        isFetching: false,
        data: [],
      });
    });

    test('fails', () => {
      expect(
        statistics(
          { data: null, isFetching: true },
          {
            type: 'STATISTICS_DATA_ERROR',
          }
        )
      ).toEqual({
        isFetching: false,
        data: null,
      });
    });
  });
});
