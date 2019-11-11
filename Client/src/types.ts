import reducers from './reducers';

export type AppState = ReturnType<typeof reducers>;

export type Dataset = {
  id: string;
  name: string;
};
