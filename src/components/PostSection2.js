
/*PostSection wrapped inside a Responsive Drawer from Material UI - React */
import React from 'react'
import PostCard from './PostCard'
import './PostSection.css'
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby'
import BlogSearch from './BlogSearch';
import Headroom from 'react-headroom'

/*Icons*/
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import RssFeed from '@material-ui/icons/RssFeed'




/* eslint-disable */
const drawerWidth = 240;

const styles = theme => ({

  root: {
    display: 'inline',
  },

  drawer: {
    [theme.breakpoints.up('lg')]: { /* Dupa large, arata drawerul din stanga */
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: { /* Navbar dimeansiunea large (fullscreen cu drawerul lg) */
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: { /* Dupa large, ascunde butonul*/
      display: 'none',
    },
  },
  
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    className: 'ButtonulMeu',
    loadMoreTitle: 'Mai multe articole...',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider/>
        
          <List>

            {/* Home */}
            <Link to="/">
              <ListItem button component="a">
                <ListItemIcon> <HomeIcon/></ListItemIcon>
                <ListItemText primary="Acasă" />
              </ListItem>
            </Link>
            
            {/* Despre */}
            <Link to="/despre">
              <ListItem button component="a">
                <ListItemIcon> <InfoIcon/></ListItemIcon>
                <ListItemText primary="Despre" />
              </ListItem>
            </Link>

            {/* Contact */}
            <Link to="/contact">
              <ListItem button component="a">
                <ListItemIcon> <MailIcon /> </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItem>
            </Link>

            {/* Newsletter */}
            <Link to="/newsletter">
              <ListItem button component="a">
                <ListItemIcon> <RssFeed /> </ListItemIcon>
                <ListItemText primary="Newsletter" />
              </ListItem>
            </Link>

          </List>

        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );  


    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      
      <div>
        <div className="headRoomPS">
        <Headroom >    
          <AppBar position="static"> {/* position aici schimba sticky :) */}
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                BetaRelease 2.2.0
              </Typography>
              
                <BlogSearch />
            
            </Toolbar>
          </AppBar>
        </Headroom>
        </div>
        
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden /*mdUp*/ implementation="css" > {/* Nu stiu inca cum procedeaza asta, dar ia valoarea de jos mai intai */}
            <Drawer
              
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>

          <Hidden mdDown implementation="css"> {/* Dupa md, drawerul din stanga e permanent */}
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
        
        
              {/* Aici pui partea drapta*/}
               {/*<div className={classes.toolbar} /> Asta pune height in AppBar ca sa-ti dea contentul mai jos */}
             <div>
            <div className="PostSection">
                {title && <h2 className="PostSection--Title">{title}</h2>}
                {!!visiblePosts.length && (
                  <div className="PostSection--Grid">
                    {visiblePosts.map((post, index) => (
                      <PostCard key={post.title + index} {...post} />
                    ))}
                  </div>
                )}
                {showLoadMore && visiblePosts.length < posts.length && (
                  <div className="taCenter"> 
                        
                    <a className="buttonulMorePosts" onClick={this.increaseLimit}>
                      {loadMoreTitle}
                    </a>
                  </div>
                )}
            </div>
            </div>
       
        

      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
