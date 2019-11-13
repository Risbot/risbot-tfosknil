import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DatasetList from './DatasetList';

describe('HomePage', () => {
  test('renders without crash', () => {
    shallow(<DatasetList datasets={[]} />);
  });

  test('contains List', () => {
    const wrapper = shallow(<DatasetList datasets={[]} />);

    expect(wrapper.find(List)).toHaveLength(1);
  });

  test('contains Link for every dataset with correct link', () => {
    const wrapper = shallow(
      <DatasetList
        datasets={[
          { id: 'id1', name: 'name 1' },
          { id: 'id2', name: 'name 2' },
        ]}
      />
    );

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(
      wrapper
        .find(Link)
        .at(0)
        .props().to
    ).toBe('dataset/id1');
    expect(
      wrapper
        .find(Link)
        .at(1)
        .props().to
    ).toBe('dataset/id2');
  });

  test('Link contains ListItem', () => {
    const wrapper = shallow(
      <DatasetList datasets={[{ id: 'id', name: 'name' }]} />
    );

    expect(wrapper.find(Link).find(ListItem)).toHaveLength(1);
  });

  test('LinkItem contains ListItemText with name of dataset', () => {
    const wrapper = shallow(
      <DatasetList datasets={[{ id: 'id', name: 'name' }]} />
    );

    expect(
      wrapper
        .find(ListItem)
        .find(ListItemText)
        .children()
        .text()
    ).toBe('name');
  });
});
