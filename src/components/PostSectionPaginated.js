
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

import NewPostCard from '../components/NewPostCard'
import './PostSection.css'
import Image from './Image'


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


export default function Album(props) {

const classes = useStyles();
const { posts= [], title= '', featuredImage='', showLoadMore= true, loadMoreTitle= 'Mai multe articole',  } = props;


  return (
    <React.Fragment>
      <CssBaseline />

      <main>

        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>

            {/*1..map the posts with node   2. insert post card with the parameters defined  */}

                    {/*Posts*/}
                        {posts.map(({ node, post }) => {


                        return <div>

                            <Grid item key={post} xs={12} sm={6} md={4}>

                                <Card>
                                    <NewPostCard
                                    featuredImage={node.frontmatter.featuredImage}
                                    title={node.frontmatter.title}
                                    excerpt={node.excerpt}
                                    slug={node.fields.slug} />
                                </Card>

                            </Grid>

                        </div>

                         })}

            </Grid>
         </Container>
        </main>
    </React.Fragment>
  );
}
