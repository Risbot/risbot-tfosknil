import React from 'react';
import { shallow } from 'enzyme';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';

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
        .props().path
    ).toBe('/');
  });
});
