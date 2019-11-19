import { IStatisticsState } from '../reducers/types';
import { getStatistics, getIsLoading } from './statistics';

describe('Statistics selectors', () => {
  test('getStatistics returns data', () => {
    expect(
      getStatistics({
        statistics: { data: {}, isFetching: false } as IStatisticsState,
      } as any)
    ).toEqual({});
  });

  test('getIsLoading returns isFetching value', () => {
    expect(
      getIsLoading({
        statistics: { data: null, isFetching: true } as IStatisticsState,
      } as any)
    ).toBe(true);
  });
});
