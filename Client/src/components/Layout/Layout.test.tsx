import React from 'react';
import { shallow } from 'enzyme';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../HomePage';
import DatasetPage from '../DatasetPage';

describe('Layout', () => {
  test('renders without crash', () => {
    shallow(<Layout />);
  });

  test('contains Container', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  test('contains route for home page', () => {
    const wrapper = shallow(<Layout />);

    expect(
      wrapper
        .find(Switch)
        .find(Route)
        .at(0)
        .prop('component')
    ).toBe(HomePage);

    expect(
      wrapper
        .find(Switch)
        .find(Route)
        .at(0)
        .props().path
    ).toBe('/');
  });

  test('contains route for dataset page', () => {
    const wrapper = shallow(<Layout />);

    expect(
      wrapper
        .find(Switch)
        .find(Route)
        .at(1)
        .prop('component')
    ).toBe(DatasetPage);

    expect(
      wrapper
        .find(Switch)
        .find(Route)
        .at(1)
        .props().path
    ).toBe('/dataset/:id');
  });
});
