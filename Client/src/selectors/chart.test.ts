import { IChartState } from '../reducers/types';
import { getChart, getIsLoading } from './Chart';

describe('Chart selectors', () => {
  test('getChart returns data', () => {
    expect(
      getChart({
        chart: { data: {}, isFetching: false } as IChartState,
      } as any)
    ).toEqual({});
  });

  test('getIsLoading returns isFetching value', () => {
    expect(
      getIsLoading({
        chart: { data: null, isFetching: true } as IChartState,
      } as any)
    ).toBe(true);
  });
});
