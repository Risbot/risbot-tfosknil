import reducers from './reducers';

export type AppState = ReturnType<typeof reducers>;

export type Dataset = {
  id: string;
  name: string;
};

export type Statistics = {
  usersCount: number;
  averageFriendsPerUser: number;
};
