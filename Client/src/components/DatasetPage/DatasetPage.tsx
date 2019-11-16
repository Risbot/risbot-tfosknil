import React, { FC, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchStatisticsIfNeeded } from '../../actions/statistics';
import { Statistics, AppState } from '../../types';
import { getStatistics, getIsLoading } from '../../selectors/statistics';
import { getDatasetId } from '../../selectors/datasets';
import StatisticsView from '../StatisticsView';

interface IStateFromProps {
  isLoading?: boolean;
  statistics?: Statistics | null;
  datasetId: string | null;
}

interface IDispatchFromProps {
  loadStatistics: (datasetId: string) => void;
}

type DatasetPageProps = IStateFromProps & IDispatchFromProps;

const DatasetPage: FC<DatasetPageProps> = ({
  statistics,
  loadStatistics,
  datasetId,
  isLoading,
}) => {
  useEffect(() => {
    if (datasetId) {
      loadStatistics(datasetId);
    }
  }, [loadStatistics, datasetId]);

  return (
    <Grid direction="column" container spacing={2}>
      <Grid item>
        <Typography>Statistics: </Typography>
      </Grid>
      <Grid item>
        {isLoading && <LinearProgress />}
        {!isLoading && statistics && <StatisticsView statistics={statistics} />}
        {!isLoading && !statistics && <Typography>Not have data</Typography>}
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
  isLoading: getIsLoading(state),
  datasetId: getDatasetId(state, owerProps),
});

const mapDispatchToProps: IDispatchFromProps = {
  loadStatistics: fetchStatisticsIfNeeded,
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
