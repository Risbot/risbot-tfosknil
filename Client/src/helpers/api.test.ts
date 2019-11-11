import nock from 'nock';
import axios from 'axios';
import { get, postForm } from './api';

describe('api', () => {
  test('get calls axios with correct path', () => {
    axios.get = jest.fn();

    nock('http://example.com', { encodedQueryParams: true }).get('/test');

    return get('test').then(() => {
      expect((axios.get as jest.Mock).mock.calls).toHaveLength(1);
      expect((axios.get as jest.Mock).mock.calls[0]).toEqual([
        'http://example.com/test',
        {
          withCredentials: true,
        },
      ]);
    });
  });

  test('post calls axios with correct path', () => {
    axios.post = jest.fn();

    nock('http://example.com', { encodedQueryParams: true }).post('/test');

    return postForm('test', {}).then(() => {
      expect((axios.post as jest.Mock).mock.calls).toHaveLength(1);
      expect((axios.post as jest.Mock).mock.calls[0]).toEqual([
        'http://example.com/test',
        {},
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      ]);
    });
  });
});
