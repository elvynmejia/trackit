import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

import store from './store';

import 'beautiful-react-diagrams/styles.css';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const themeName = 'ontrail';

const palette = {
  primary: { main: cyan['600'], contrastText: '#FAFAFA' },
  secondary: { main: red['500'], contrastText: '#FAFAFA' },
};

const theme = {
  ...createMuiTheme({ palette, themeName }),
};

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
