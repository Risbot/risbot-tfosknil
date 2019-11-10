import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';

const App: FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <Layout />
  </BrowserRouter>
);

export default hot(App);
