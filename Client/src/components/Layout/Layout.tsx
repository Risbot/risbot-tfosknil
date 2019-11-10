import React, { FC } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Layout: FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root} component="main">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Container>
  );
};

export default Layout;
