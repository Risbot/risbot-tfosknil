import React from 'react';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import DatasetPage from './DatasetPage';
import StatisticsView from '../StatisticsView';

describe('DatasetPage', () => {
  test('renders without crash', () => {
    shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
      />
    );
  });

  test('calls loadStatistics on mount', () => {
    const loadStatistics = jest.fn();
    mount(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={loadStatistics}
      />
    );

    expect(loadStatistics.mock.calls[0][0]).toBe('datasetId');
  });

  test('contains Statistic title', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
      />
    );

    expect(wrapper.find(Typography).at(0)).toHaveLength(1);
  });

  test('renders LinearProgress when loading', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        isLoading
        datasetId="datasetId"
        loadStatistics={() => {}}
      />
    );

    expect(wrapper.find(StatisticsView)).toHaveLength(0);
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
  });

  test('renders StatisticsView when not loading data', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        statistics={{ averageFriendsPerUser: 0, usersCount: 0 }}
      />
    );

    expect(wrapper.find(StatisticsView)).toHaveLength(1);
    expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });

  test('renders emty data string when not loading data and not have data', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
      />
    );

    expect(wrapper.find(Typography).at(1)).toHaveLength(1);
  });
});
