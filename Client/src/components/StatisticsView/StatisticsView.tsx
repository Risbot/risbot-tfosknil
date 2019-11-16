import React, { FC, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Statistics } from '../../types';

interface IStatisticsViewProps {
  statistics: Statistics;
}

const StatisticsView: FC<IStatisticsViewProps> = ({ statistics }) => (
  <Fragment>
    <Typography>{`Users count: ${statistics.usersCount}`}</Typography>
    <Typography>{`Average friends per user: ${statistics.averageFriendsPerUser}`}</Typography>
  </Fragment>
);

export default StatisticsView;
