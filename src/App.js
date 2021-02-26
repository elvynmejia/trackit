import React from 'react';
import { useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import Leads from 'components/leads/leads';
import ToastMessage from 'components/shared/toast_message'


const App = (props) => {
  const toastProps = useSelector(state => {
    return state?.interfaces?.toast || {};
  });

  return (
    <Grid container spacing={2}>
      <ToastMessage {...toastProps } />
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={8}>
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
      <Grid item xs={3}>
      </Grid>
    </Grid>
  );
};

export default App;
