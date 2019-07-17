/*PostCard -> PostSection ->HomePage */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby'

const useStyles = makeStyles({
  card: {
    maxWidth: 432,
  },
  media: {
    height: 140,
  },
});


export default function MediaCard(props) {
  const classes = useStyles();

const {
  featuredImage,
  title,
  excerpt,
  slug,
  categories= [],
  className= '',
  date,
} = props;


  return (

    <Card className={classes.card}>

      <CardActionArea>
      <Link to={slug} className={`PostCard ${className}`}>


        <CardMedia
          className={classes.media}
          image={featuredImage}
          title={title}
        />


        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {title && <h3 >{title}</h3>}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {excerpt && <div>{excerpt}</div>}
          </Typography>

        </CardContent>

</Link>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}