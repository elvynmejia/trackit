import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Link as RouterLink,
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';


// import cyan from '@material-ui/core/colors/cyan';
import purple from '@material-ui/core/colors/purple';

import red from '@material-ui/core/colors/red';

import store from './store';

import 'beautiful-react-diagrams/styles.css';
import './index.css';
import App from './App';

import ListItemLink from 'components/shared/list_item_link';

import reportWebVitals from './reportWebVitals';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

const themeName = 'ontrail';

const palette = {
  primary: { main: purple['600'], contrastText: '#FAFAFA' },
  secondary: { main: red['500'], contrastText: '#FAFAFA' },
};

const theme = {
  ...createMuiTheme({ palette, themeName }),
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link
              component={RouterLink}
              to="/"
              exact
              className={classes.logo}
            >
              Tralent
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/*
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            */}
            <ListItem>
              <ListItemLink
                to="/leads"
                exact primary="Leads"
              />
            </ListItem>
          </List>
          <Divider />

          {/*
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          */}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <App />
      </main>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <NavBar />
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
