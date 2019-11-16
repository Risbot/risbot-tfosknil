import React from 'react';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatasetForm from './DatasetForm';
import FileButtonInput from '../FileButtonInput';

describe('HomePage', () => {
  test('renders without crash', () => {
    shallow(<DatasetForm addDataset={() => {}} />);
  });

  test('contains FileButtonInput', () => {
    const wrapper = shallow(<DatasetForm addDataset={() => {}} />);

    expect(wrapper.find(FileButtonInput)).toHaveLength(1);
  });

  test('contains TextField for name', () => {
    const wrapper = shallow(<DatasetForm addDataset={() => {}} />);

    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  test('contains confirm Button', () => {
    const wrapper = shallow(<DatasetForm addDataset={() => {}} />);

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  test('calls addDataset when click on confirm button and clear fields', () => {
    const addDataset = jest.fn();
    const file = new File([], 'filename');
    const wrapper = shallow(<DatasetForm addDataset={addDataset} />);

    wrapper
      .find(TextField)
      .simulate('change', { target: { value: 'datasetName' } });

    wrapper
      .find(FileButtonInput)
      .simulate('change', { target: { files: [file] } });

    wrapper.find(Button).simulate('click');

    expect(addDataset.mock.calls[0]).toEqual(['datasetName', file]);
    expect(wrapper.find(Button).props().disabled).toBe(true);
  });

  test('disable confirm button when not filled all fields', () => {
    const wrapper = shallow(<DatasetForm addDataset={() => {}} />);

    expect(wrapper.find(Button).props().disabled).toBe(true);

    wrapper
      .find(TextField)
      .simulate('change', { target: { value: 'datasetName' } });

    expect(wrapper.find(Button).props().disabled).toBe(true);

    wrapper
      .find(FileButtonInput)
      .simulate('change', { target: { files: [new File([], 'fileName')] } });

    expect(wrapper.find(Button).props().disabled).toBe(false);
  });
});
