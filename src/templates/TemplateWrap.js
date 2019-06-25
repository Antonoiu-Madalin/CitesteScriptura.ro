import React from 'react';
import { Link } from 'gatsby'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';


/*Icons*/
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import RssFeed from '@material-ui/icons/RssFeed'
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Book from '@material-ui/icons/Book';




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },


}));

export default function ResponsiveDrawer(props) {
  const { container, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Meta Categorii
        </ListSubheader>
      }
    >
            {/* Home */}
            <Link to="/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <HomeIcon/></ListItemIcon>
                <ListItemText primary="Toate/ Acasa" />
              </ListItem>
            </Link>
            
            {/* Despre */}
            <Link to="/studiu-biblic/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <Book/></ListItemIcon>
                <ListItemText primary="Studiu biblic" />
              </ListItem>
            </Link>

            {/* Contact */}
            <Link to="/raspunsuri-rapide/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <MailIcon /> </ListItemIcon>
                <ListItemText primary="Raspunsuri rapide" />
              </ListItem>
            </Link>

      </List>
      <Divider />



       <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >

      <ListItem button> 
        <ListItemIcon> 
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemText primary="Mooned" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemText primary="Delayed" />
          </ListItem>

        </List>
      </Collapse>
    </List>
    <Divider />
     
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items 2
        </ListSubheader>
      }
    >
            {/* Home */}
            <Link to="/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <HomeIcon/></ListItemIcon>
                <ListItemText primary="Acasă" />
              </ListItem>
            </Link>
            
            {/* Despre */}
            <Link to="/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <InfoIcon/></ListItemIcon>
                <ListItemText primary="Despre" />
              </ListItem>
            </Link>

            {/* Contact */}
            <Link to="/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <MailIcon /> </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItem>
            </Link>

            {/* Newsletter */}
            <Link to="/" className="listItemClear">
              <ListItem button component="a">
                <ListItemIcon> <RssFeed /> </ListItemIcon>
                <ListItemText primary="Newsletter" />
              </ListItem>
            </Link>

      </List>
      <Divider />

    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            SS-Template
          </Typography>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          > 
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
 
                {children}

      </main>
    </div>
  );
}
