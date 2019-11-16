import React from 'react';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import HomePage from './HomePage';
import DatasetList from '../DatasetList';
import DatasetForm from '../DatasetForm';

describe('HomePage', () => {
  test('renders without crash', () => {
    shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
      />
    );
  });

  test('renders DatasetList when not loading data', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
      />
    );

    expect(wrapper.find(LinearProgress)).toHaveLength(0);
    expect(wrapper.find(DatasetList)).toHaveLength(1);
  });

  test('contains title for DatasetForm', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
      />
    );

    expect(wrapper.find(Typography).at(0)).toHaveLength(1);
  });

  test('contains DatasetForm', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
      />
    );

    expect(wrapper.find(DatasetForm)).toHaveLength(1);
  });

  test('contains title for DatasetList', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
      />
    );

    expect(wrapper.find(Typography).at(1)).toHaveLength(1);
  });

  test('calls loadDatasets on mount', () => {
    const loadDatasets = jest.fn();
    mount(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={loadDatasets}
      />
    );

    expect(loadDatasets.mock.calls).toHaveLength(1);
  });

  test('renders LinearProgress when is loading data', () => {
    const wrapper = shallow(
      <HomePage.WrappedComponent
        addDataset={() => {}}
        datasets={[]}
        loadDatasets={() => {}}
        isLoading
      />
    );

    expect(wrapper.find(DatasetList)).toHaveLength(0);
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
  });
});
