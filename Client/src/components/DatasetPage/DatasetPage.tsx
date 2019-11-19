import React, { FC, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchStatisticsIfNeeded } from '../../actions/statistics';
import { fetchChartIfNeeded } from '../../actions/chart';
import { Statistics, AppState, Chart } from '../../types';
import { getStatistics, getIsLoading } from '../../selectors/statistics';
import { getDatasetId } from '../../selectors/datasets';
import StatisticsView from '../StatisticsView';
import FriendshipChart from '../FriendshipChart';
import {
  getChart,
  getIsLoading as getIsChartLoading,
} from '../../selectors/chart';

interface IStateFromProps {
  isLoading?: boolean;
  statistics?: Statistics | null;
  datasetId: string | null;
  chartData?: Chart | null;
}

interface IDispatchFromProps {
  loadStatistics: (datasetId: string) => void;
  loadChart: (datasetId: string) => void;
}

type DatasetPageProps = IStateFromProps & IDispatchFromProps;

const DatasetPage: FC<DatasetPageProps> = ({
  statistics,
  loadStatistics,
  loadChart,
  datasetId,
  isLoading,
  chartData,
}) => {
  useEffect(() => {
    if (datasetId) {
      loadStatistics(datasetId);
      loadChart(datasetId);
    }
  }, [loadStatistics, loadChart, datasetId]);

  if (isLoading) return <LinearProgress />;

  return (
    <Grid container alignItems="stretch">
      <Grid item direction="column" container spacing={2}>
        <Grid item>
          <Typography>Statistics: </Typography>
        </Grid>
        <Grid item>
          {statistics && <StatisticsView statistics={statistics} />}
          {!statistics && <Typography>Not have data</Typography>}
        </Grid>
        <Grid item>
          <Typography>Friendship chart:</Typography>
        </Grid>
        <Grid item container>
          {chartData && <FriendshipChart data={chartData} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps: MapStateToProps<
  IStateFromProps,
  RouteChildrenProps,
  AppState
> = (state: AppState, owerProps: RouteChildrenProps) => ({
  statistics: getStatistics(state),
  isLoading: getIsLoading(state) || getIsChartLoading(state),
  datasetId: getDatasetId(state, owerProps),
  chartData: getChart(state),
});

const mapDispatchToProps: IDispatchFromProps = {
  loadStatistics: fetchStatisticsIfNeeded,
  loadChart: fetchChartIfNeeded,
};

export default connect<
  IStateFromProps,
  IDispatchFromProps,
  RouteChildrenProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(DatasetPage);
