import React from 'react';
import { shallow } from 'enzyme';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import FileButtonInput from './FileButtonInput';

describe('FileButtonInput', () => {
  test('renders without crash', () => {
    shallow(<FileButtonInput onChange={() => {}} id="file-input" />);
  });

  test('contains input with type file and passed id', () => {
    const wrapper = shallow(
      <FileButtonInput onChange={() => {}} id="file-input" />
    );

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('type')).toBe('file');
    expect(wrapper.find('input').prop('accept')).toBe('text/plain');
    expect(wrapper.find('input').prop('id')).toBe('file-input');
  });

  test('contains label with passed id', () => {
    const wrapper = shallow(
      <FileButtonInput onChange={() => {}} id="file-input" />
    );

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').prop('htmlFor')).toBe('file-input');
  });

  test('label contains Button with AttachFileIcon', () => {
    const wrapper = shallow(
      <FileButtonInput onChange={() => {}} id="file-input" />
    );

    expect(wrapper.find('label').find(Button)).toHaveLength(1);
    expect(
      wrapper
        .find('label')
        .find(Button)
        .prop('component')
    ).toBe('span');
    expect(
      wrapper
        .find('label')
        .find(Button)
        .find(AttachFileIcon)
    ).toHaveLength(1);
  });

  test('handle change', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <FileButtonInput onChange={onChange} id="file-input" />
    );

    wrapper.find('input').simulate('change');

    expect(onChange.mock.calls).toHaveLength(1);
  });
});
