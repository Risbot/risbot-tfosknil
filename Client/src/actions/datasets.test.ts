import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchDatasetsIfNeeded, createDataset } from './datasets';
import { AppState } from '../types';
import { Actions } from './types';

afterEach(() => {
  nock.cleanAll();
});

describe('Datasets actions', () => {
  describe('fetch dataset', () => {
    test('can be successful', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .get('/dataset')
        .reply(200, [
          {
            id: 'id',
            name: 'name',
          },
        ]);

      const mockStore = configureMockStore<
        AppState,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        dataset: {
          data: null,
          isFetching: false,
          didInvalidate: false,
        },
      });

      return state.dispatch(fetchDatasetsIfNeeded()).then(() => {
        expect(state.getActions()).toEqual([
          { type: 'DATASET_LIST_REQUEST' },
          {
            type: 'DATASET_LIST_SUCCESS',
            payload: [{ id: 'id', name: 'name' }],
          },
        ]);
      });
    });

    test('can fail', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .get('/dataset')
        .reply(500);

      const mockStore = configureMockStore<
        AppState,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        dataset: {
          data: null,
          isFetching: false,
          didInvalidate: false,
        },
      });

      await state.dispatch(fetchDatasetsIfNeeded());
      expect(state.getActions()).toEqual([
        { type: 'DATASET_LIST_REQUEST' },
        { type: 'DATASET_LIST_ERROR' },
      ]);
    });

    test('does not load when already fetching', async () => {
      const mockStore = configureMockStore<
        AppState,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        dataset: {
          data: null,
          isFetching: true,
          didInvalidate: false,
        },
      });

      return state.dispatch(fetchDatasetsIfNeeded()).then(() => {
        expect(state.getActions()).toHaveLength(0);
      });
    });
  });

  describe('create dataset', () => {
    // FIXME
    test('can be successful', async () => {
      nock('http://example.com', { encodedQueryParams: true })
        .post('/dataset')
        .reply(200);

      const mockStore = configureMockStore<
        AppState,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        dataset: {
          data: null,
          isFetching: false,
          didInvalidate: false,
        },
      });

      return state
        .dispatch(createDataset('dataset name', new File([], 'file')))
        .then(() => {
          expect(state.getActions()).toEqual([
            { type: 'DATASET_ADD_REQUEST' },
            { type: 'DATASET_ADD_SUCCESS' },
          ]);
        });
    });

    test('can fail', () => {
      nock('http://example.com', { encodedQueryParams: true })
        .post('/dataset')
        .reply(500);

      const mockStore = configureMockStore<
        AppState,
        ThunkDispatch<AppState, void, Actions>
      >([thunk]);
      const state = mockStore({
        dataset: {
          data: null,
          isFetching: false,
          didInvalidate: false,
        },
      });

      return state
        .dispatch(createDataset('dataset name', new File([], 'fileName')))
        .then(() => {
          expect(state.getActions()).toEqual([
            { type: 'DATASET_ADD_REQUEST' },
            { type: 'DATASET_ADD_ERROR' },
          ]);
        });
    });
  });
});
