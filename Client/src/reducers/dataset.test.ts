import datasets from './dataset';

describe('Datasets reducer', () => {
  describe('fetching datasets', () => {
    test('starts', () => {
      expect(
        datasets(
          { data: null, didInvalidate: false, isFetching: false },
          {
            type: 'DATASET_LIST_REQUEST',
          }
        )
      ).toEqual({
        data: null,
        didInvalidate: false,
        isFetching: true,
      });
    });

    test('finishes', () => {
      expect(
        datasets(
          { data: null, didInvalidate: false, isFetching: true },
          {
            type: 'DATASET_LIST_SUCCESS',
            payload: [],
          }
        )
      ).toEqual({
        isFetching: false,
        didInvalidate: false,
        data: [],
      });
    });

    test('fails', () => {
      expect(
        datasets(
          { data: null, didInvalidate: false, isFetching: true },
          {
            type: 'DATASET_LIST_ERROR',
          }
        )
      ).toEqual({
        isFetching: false,
        didInvalidate: false,
        data: null,
      });
    });
  });
});
