import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import App from './App';

describe('App', () => {
  test('renders without crash', () => {
    shallow(<App />);
  });

  test('contains BrowserRouter', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
  });

  test('contains CssBaseline', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CssBaseline)).toHaveLength(1);
  });

  test('contains Layout', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
});
