import React from 'react';
import { useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Leads from 'components/leads/leads';
import ToastMessage from 'components/shared/toast_message'


const App = (props) => {
  const toastProps = useSelector(state => {
    return state?.interfaces?.toast || {};
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <ToastMessage {...toastProps } />
        <Leads />
      </Grid>
      <Grid item xs={2}>
      </Grid>
    </Grid>
  );
};

export default App;
