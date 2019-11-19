import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchChartIfNeeded } from './chart';
import { AppState } from '../types';
import { Actions } from './types';
import { IChartState } from '../reducers/types';

afterEach(() => {
  nock.cleanAll();
});

type State = {
  chart: IChartState;
};

describe('Chart actions', () => {
  describe('fetch chart data', () => {
    test('can be successful', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .get('/chart/datasetId')
        .reply(200, {});

      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        chart: {
          data: null,
          isFetching: false,
        },
      });

      return state.dispatch(fetchChartIfNeeded('datasetId')).then(() => {
        expect(state.getActions()).toEqual([
          { type: 'CHART_REQUEST' },
          {
            type: 'CHART_SUCCESS',
            payload: {},
          },
        ]);
      });
    });

    test('can fail', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .get('/chart/datasetId')
        .reply(500);

      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        chart: {
          data: null,
          isFetching: false,
        },
      });

      await state.dispatch(fetchChartIfNeeded('datasetId'));
      expect(state.getActions()).toEqual([
        { type: 'CHART_REQUEST' },
        { type: 'CHART_ERROR' },
      ]);
    });

    test('does not load when already fetching', async () => {
      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        chart: {
          data: null,
          isFetching: true,
        },
      });

      return state.dispatch(fetchChartIfNeeded('datasetId')).then(() => {
        expect(state.getActions()).toHaveLength(0);
      });
    });
  });
});
