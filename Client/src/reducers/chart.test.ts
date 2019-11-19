import chart from './chart';

describe('Chart reducer', () => {
  describe('fetching chart', () => {
    test('starts', () => {
      expect(
        chart(
          { data: null, isFetching: false },
          {
            type: 'CHART_REQUEST',
          }
        )
      ).toEqual({
        data: null,
        isFetching: true,
      });
    });

    test('finishes', () => {
      expect(
        chart(
          { data: null, isFetching: true },
          {
            type: 'CHART_SUCCESS',
            payload: {
              nodes: [{ id: 'id' }],
              links: [{ source: 'source', target: 'target' }],
            },
          }
        )
      ).toEqual({
        isFetching: false,
        data: {
          nodes: [{ id: 'id' }],
          links: [{ source: 'source', target: 'target' }],
        },
      });
    });

    test('fails', () => {
      expect(
        chart(
          { data: null, isFetching: true },
          {
            type: 'CHART_ERROR',
          }
        )
      ).toEqual({
        isFetching: false,
        data: null,
      });
    });
  });
});
