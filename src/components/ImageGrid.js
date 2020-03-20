import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: "90%"
  }
}));

export default function ImageGrid({ images }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        {images.map(img => (
          // auto-layout being used for Grid item to make items equitably share available space
          <Grid container item xs key={img.url} justify="center"> 
            <img src={img.url} alt=""/>
          </Grid>
        ))}
      </Grid>
      
    </div>
  )
}
