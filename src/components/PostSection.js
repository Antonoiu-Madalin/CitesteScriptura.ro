
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PostCard from '../components/PostCard'
import './PostSection.css'



const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album(props) {

const classes = useStyles();
const { posts= [], title= '', showLoadMore= true, loadMoreTitle= 'Mai multe articole',} = props;
const [limit, setLimit] = useState(12);
const  visiblePosts  = posts.slice(0, limit || posts.length)



  return (
    <React.Fragment>
      <CssBaseline />

      <main>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

            {/*1*/}
            {title && <h2>{title}</h2>}
            {/*2*/}
            {visiblePosts.map((post, index) => (

                <Grid item key={post} xs={12} sm={6} md={4}>

                        <Card>
                            <PostCard key={post.title + index} {...post} />
                            {/*3*/}
                        </Card>

                    </Grid>

                        ))}
                        {showLoadMore && visiblePosts.length < posts.length && ( <div className="taCenter"> <button className="buttonulMorePosts" onClick={() =>{setLimit(limit+6)}}> {loadMoreTitle}</button></div>)}
          </Grid>

        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>

      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
