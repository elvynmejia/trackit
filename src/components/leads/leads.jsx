import React, { useEffect }from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { findAll } from 'actions/api';
import { TYPE } from 'models/lead';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

// import { addCount } from "./store/counter/actions";

const REQUEST_ID = 'components/leads';
export const Leads = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState({});

  const leads = useSelector(state => get(state.serverSide, [TYPE, REQUEST_ID],{}));
  const dispatch = useDispatch();

  useEffect(() => {
  	dispatch(findAll(
  		TYPE,
  		{},
  		REQUEST_ID
  	))
  }, [dispatch]);

  const handleClick = (id) => {
    setOpen({...open, [id]: !open[id]});
  };

  return (
  	<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        	Job Leads
        </ListSubheader>
      }
      className={classes.root}
    >
    	{Object.values(leads).map(({id, company_name, position, status }) => {
    		return (
    			<div key={id}>
    			  <ListItem button onClick={() => handleClick(id)}>
			        <ListItemText primary={`${company_name} <> ${position || status}`} />
			        {open[id] ? <ExpandLess /> : <ExpandMore />}
			      </ListItem>
			      <Collapse in={open[id]} timeout="auto" unmountOnExit>
			        <List component="div" disablePadding>
			          <ListItem button className={classes.nested}>
			            <ListItemIcon>
			              <StarBorder />
			            </ListItemIcon>
			            <ListItemText primary="Starred" />
			          </ListItem>
			        </List>
			      </Collapse>
    			</div>
    		)
    	})}
    </List>
  );
};

export default Leads;