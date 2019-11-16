import datasets from './datasets';

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

  describe('create datasets', () => {
    test('starts', () => {
      expect(
        datasets(
          { data: null, didInvalidate: false, isFetching: false },
          {
            type: 'DATASET_ADD_REQUEST',
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
            type: 'DATASET_ADD_SUCCESS',
          }
        )
      ).toEqual({
        isFetching: false,
        didInvalidate: true,
        data: null,
      });
    });

    test('fails', () => {
      expect(
        datasets(
          { data: null, didInvalidate: false, isFetching: true },
          {
            type: 'DATASET_ADD_ERROR',
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
