import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders without crash', () => {
    shallow(<HomePage />);
  });

  test('contains content', () => {
    const wrapper = shallow(<HomePage />);

    expect(
      wrapper
        .find(Typography)
        .at(0)
        .children()
        .text()
    ).toBe('Home page');
  });
});
