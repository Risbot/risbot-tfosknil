import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchStatisticsIfNeeded } from './statistics';
import { AppState } from '../types';
import { Actions } from './types';
import { IStatisticsState } from '../reducers/types';

afterEach(() => {
  nock.cleanAll();
});

type State = {
  statistics: IStatisticsState;
};

describe('Statistics actions', () => {
  describe('fetch statistics', () => {
    test('can be successful', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .get('/statistic/datasetId')
        .reply(200, {});

      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        statistics: {
          data: null,
          isFetching: false,
        },
      });

      return state.dispatch(fetchStatisticsIfNeeded('datasetId')).then(() => {
        expect(state.getActions()).toEqual([
          { type: 'STATISTICS_DATA_REQUEST' },
          {
            type: 'STATISTICS_DATA_SUCCESS',
            payload: {},
          },
        ]);
      });
    });

    test('can fail', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .post('/statistic/datasetId')
        .reply(500);

      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        statistics: {
          data: null,
          isFetching: false,
        },
      });

      await state.dispatch(fetchStatisticsIfNeeded('datasetId'));
      expect(state.getActions()).toEqual([
        { type: 'STATISTICS_DATA_REQUEST' },
        { type: 'STATISTICS_DATA_ERROR' },
      ]);
    });

    test('does not load when already fetching', async () => {
      const mockStore = configureMockStore<
        State,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        statistics: {
          data: null,
          isFetching: true,
        },
      });

      return state.dispatch(fetchStatisticsIfNeeded('datasetId')).then(() => {
        expect(state.getActions()).toHaveLength(0);
      });
    });
  });
});
