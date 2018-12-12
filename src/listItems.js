import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button>
            <Link to="/">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
            </Link>
            <Link to="/" style={{ textDecoration: 'none', marginLeft: '8px', padding: '0' }}>
                <ListItemText primary="Inbox" />
            </Link>

        </ListItem>
        <ListItem button>
            <Link to="/drafts">
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
            </Link>
            <Link to="/drafts" style={{ textDecoration: 'none', marginLeft: '8px', padding: '0' }}>
                <ListItemText primary="Drafts" />
            </Link>
        </ListItem>
        <ListItem button>
            <Link to="/spam">
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
            </Link>
            <Link to="/spam" style={{ textDecoration: 'none', marginLeft: '8px', padding: '0' }}>
                <ListItemText primary="Spam" />
            </Link>
        </ListItem>
        <ListItem button>
            <Link to="/trash">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
            </Link>
            <Link to="/trash" style={{ textDecoration: 'none', marginLeft: '8px', padding: '0' }}>
                <ListItemText primary="Trash" />
            </Link>
        </ListItem>

    </div>

);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem> */}
    </div>
);