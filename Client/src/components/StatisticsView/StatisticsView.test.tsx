import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import StatisticsView from './StatisticsView';

describe('StatisticsView', () => {
  test('renders without crash', () => {
    shallow(
      <StatisticsView
        statistics={{ averageFriendsPerUser: 0, usersCount: 0 }}
      />
    );
  });

  test('Contains users count', () => {
    const wrapper = shallow(
      <StatisticsView
        statistics={{ averageFriendsPerUser: 0, usersCount: 10 }}
      />
    );

    expect(
      wrapper
        .find(Typography)
        .at(0)
        .children()
        .text()
    ).toBe('Users count: 10');
  });

  test('Contains average friends per user value', () => {
    const wrapper = shallow(
      <StatisticsView
        statistics={{ averageFriendsPerUser: 10, usersCount: 0 }}
      />
    );

    expect(
      wrapper
        .find(Typography)
        .at(1)
        .children()
        .text()
    ).toBe('Average friends per user: 10');
  });
});
