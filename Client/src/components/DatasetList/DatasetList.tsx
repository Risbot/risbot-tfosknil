import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Dataset } from '../../types';

interface IDatasetListProps {
  datasets: Array<Dataset>;
}

const DatasetList: FC<IDatasetListProps> = ({ datasets }) => (
  <List>
    {datasets.map(dataset => (
      <Link key={dataset.id} to={`dataset/${dataset.id}`}>
        <ListItem>
          <ListItemText>{dataset.name}</ListItemText>
        </ListItem>
      </Link>
    ))}
  </List>
);

export default DatasetList;
