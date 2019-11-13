import React, { FC, Fragment, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import DatasetList from '../DatasetList';
import { fetchDatasetIfNeeded } from '../../actions/dataset';
import { Dataset, AppState } from '../../types';

interface IStateFromProps {
  datasets: Array<Dataset>;
}

interface IDispatchFromProps {
  loadDatasets: () => void;
}

type HomeProps = IStateFromProps & IDispatchFromProps;

const HomePage: FC<HomeProps> = ({ loadDatasets, datasets }) => {
  useEffect(() => {
    loadDatasets();
  }, [loadDatasets]);
  return (
    <Fragment>
      <DatasetList datasets={datasets} />
    </Fragment>
  );
};

const mapStateToProps: MapStateToProps<IStateFromProps, {}, AppState> = (
  state: AppState
) => ({
  datasets: state.dataset.data || [],
});

const mapDispatchToProps: IDispatchFromProps = {
  loadDatasets: fetchDatasetIfNeeded,
};

export default connect<IStateFromProps, IDispatchFromProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
