import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import store from './store';

const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <Layout />
    </BrowserRouter>
  </Provider>
);

export default hot(App);
