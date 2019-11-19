import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveNetworkCanvas } from '@nivo/network';
import FriendshipChart from './FriendshipChart';

describe('FriendshipChart', () => {
  test('renders without crash', () => {
    shallow(
      <FriendshipChart
        data={{
          links: [],
          nodes: [],
        }}
      />
    );
  });

  test('contains ResponsiveNetworkCanvas', () => {
    const wrapper = shallow(
      <FriendshipChart
        data={{
          links: [],
          nodes: [],
        }}
      />
    );

    expect(wrapper.find(ResponsiveNetworkCanvas)).toHaveLength(1);
    expect(wrapper.find(ResponsiveNetworkCanvas).prop('nodeColor')).toBe(
      'rgb(97, 205, 187)'
    );
  });

  test('passed data to ResponsiveNetworkCanvas', () => {
    const wrapper = shallow(
      <FriendshipChart
        data={{
          links: [],
          nodes: [],
        }}
      />
    );

    expect(wrapper.find(ResponsiveNetworkCanvas).prop('nodes')).toEqual([]);
    expect(wrapper.find(ResponsiveNetworkCanvas).prop('links')).toEqual([]);
  });
});
