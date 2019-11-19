import React from 'react';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import DatasetPage from './DatasetPage';
import StatisticsView from '../StatisticsView';
import FriendshipChart from '../FriendshipChart';

describe('DatasetPage', () => {
  test('renders without crash', () => {
    shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={() => {}}
      />
    );
  });

  test('calls loadStatistics on mount', () => {
    const loadStatistics = jest.fn();
    mount(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={loadStatistics}
        loadChart={() => {}}
      />
    );

    expect(loadStatistics.mock.calls[0][0]).toBe('datasetId');
  });

  test('contains Statistic title', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={() => {}}
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
        loadChart={() => {}}
      />
    );

    expect(wrapper.find(StatisticsView)).toHaveLength(0);
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
  });

  test('renders StatisticsView when have data', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        statistics={{ averageFriendsPerUser: 0, usersCount: 0 }}
        loadChart={() => {}}
      />
    );

    expect(wrapper.find(StatisticsView)).toHaveLength(1);
  });

  test('renders info text when not have statistical data', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={() => {}}
      />
    );

    expect(wrapper.find(StatisticsView)).toHaveLength(0);
    expect(wrapper.find(Typography).at(1)).toHaveLength(1);
  });

  test('calls loadChart on mount', () => {
    const loadChart = jest.fn();
    mount(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={loadChart}
      />
    );

    expect(loadChart.mock.calls[0][0]).toBe('datasetId');
  });

  test('contains Chart title', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={() => {}}
      />
    );

    expect(wrapper.find(Typography).at(2)).toHaveLength(1);
  });

  test('renders chart when have data', () => {
    const wrapper = shallow(
      <DatasetPage.WrappedComponent
        datasetId="datasetId"
        loadStatistics={() => {}}
        loadChart={() => {}}
        chartData={{
          links: [],
          nodes: [],
        }}
      />
    );

    expect(wrapper.find(FriendshipChart)).toHaveLength(1);
  });
});
