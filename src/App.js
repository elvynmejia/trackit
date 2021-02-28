import React from 'react';
import { useSelector} from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


import Leads from 'components/leads/leads';
import ToastMessage from 'components/shared/toast_message'
import NavBar from 'components/nav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

const App = (props) => {

  const classes = useStyles();
  const toastProps = useSelector(state => {
    return state?.interfaces?.toast || {};
  });

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <Toolbar />
        <Grid container spacing={2}>
          <ToastMessage {...toastProps } />
          <Grid item md={1}>
          </Grid>
          <Grid item xs={12} md={8}>
            <Switch>
              <Route path="/" exact>
                <Leads />
              </Route>
              <Route path="/leads" exact>
                <Leads />
              </Route>
              <Route>
                <Typography variant="h4">
                  Can't find the content you were looking for
                </Typography>
              </Route>
            </Switch>
          </Grid>
          <Grid item md={3}>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default App;
