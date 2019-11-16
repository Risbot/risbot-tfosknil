import React, { FC, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import DatasetList from '../DatasetList';
import DatasetForm from '../DatasetForm';
import { fetchDatasetsIfNeeded, createDataset } from '../../actions/datasets';
import { Dataset, AppState } from '../../types';
import {
  getDatasets,
  getIsInvalid,
  getIsLoading,
} from '../../selectors/datasets';

interface IStateFromProps {
  datasets: Array<Dataset>;
  isLoading?: boolean;
  isInvalid?: boolean;
}

interface IDispatchFromProps {
  loadDatasets: () => void;
  addDataset: (name: string, file: File) => void;
}

type HomeProps = IStateFromProps & IDispatchFromProps;

const HomePage: FC<HomeProps> = ({
  isInvalid,
  addDataset,
  loadDatasets,
  datasets,
  isLoading,
}) => {
  useEffect(() => {
    loadDatasets();
  }, [loadDatasets, isInvalid]);

  return (
    <Grid direction="column" container spacing={2}>
      <Grid item>
        <Typography>Create new dataset</Typography>
      </Grid>
      <Grid item>
        <DatasetForm addDataset={addDataset} />
      </Grid>
      <Grid item>
        <Typography>Dataset list:</Typography>
      </Grid>
      <Grid item>
        {isLoading && <LinearProgress />}
        {!isLoading && <DatasetList datasets={datasets} />}
      </Grid>
    </Grid>
  );
};

const mapStateToProps: MapStateToProps<IStateFromProps, {}, AppState> = (
  state: AppState
) => ({
  datasets: getDatasets(state),
  isInvalid: getIsInvalid(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps: IDispatchFromProps = {
  loadDatasets: fetchDatasetsIfNeeded,
  addDataset: createDataset,
};

export default connect<IStateFromProps, IDispatchFromProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
