import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';
import DatasetList from '../DatasetList';

describe('HomePage', () => {
  test('renders without crash', () => {
    shallow(
      <HomePage.WrappedComponent datasets={[]} loadDatasets={() => {}} />
    );
  });

  test('contains DatasetList', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent datasets={[]} loadDatasets={() => {}} />
    );

    expect(wrapper.find(DatasetList)).toHaveLength(1);
  });
});
