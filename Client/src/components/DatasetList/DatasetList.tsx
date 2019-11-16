import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Dataset } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface IDatasetListProps {
  datasets: Array<Dataset>;
}

const DatasetList: FC<IDatasetListProps> = ({ datasets }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {datasets.map(dataset => (
          <Link key={dataset.id} to={`dataset/${dataset.id}`}>
            <ListItem button>
              <ListItemText>{dataset.name}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default DatasetList;
