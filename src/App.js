import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

// import ResponsiveDrawer from './components/responsive_drawer';
import store from './store';

const themeName = 'ontrail';

const palette = {
  primary: { main: cyan['600'], contrastText: '#FAFAFA' },
  secondary: { main: red['500'], contrastText: '#FAFAFA' },
};

const theme = {
  ...createMuiTheme({ palette, themeName }),
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          A drawer
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;