import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageModal from './ImageModal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: "80%",
    height: "80%",
  },
}));

export default function ImageGrid({ images }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [curImage, setCurImage] = useState({});

  const handleModalOpen = (image) => {
    setOpen(true);
    setCurImage(image)
  };

  return (
    <div className={classes.root}>
      {
        matches ?
        <Grid container spacing={2} alignItems="center">
          {images.map(img => (
            // auto-layout being used for Grid item to make items equitably share available space
            <Grid container item xs key={img.url} justify="center"> 
              <img src={img.url} alt="" onClick={() => handleModalOpen(img)} />
            </Grid>
          ))}
        </Grid>
        :
        <GridList cellHeight={100} className={classes.gridList} cols={12}>
          {images.map(img => (
            <GridListTile key={img.url} cols={Math.ceil(img.width/100)} rows={Math.ceil(img.height/100)}>
              <img src={img.url} alt="" onClick={() => handleModalOpen(img)} />
            </GridListTile>
          ))}
        </GridList>
      }
      
      <ImageModal open={open} image={curImage} setOpen={setOpen} />
    </div>
  )
}
