import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
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
  tileBar: {
    background: "transparent"
  },
  imgContainer: {
    position: "relative",
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.54)',
    position: "absolute",
    bottom: 10,
    right: 5,
    padding: 0,
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
              <div className={classes.imgContainer} >
                <img src={img.url} alt=""/>
                <IconButton aria-label={`info about ${img.url}`} className={classes.infoIcon} onClick={() => handleModalOpen(img)}>
                  <InfoIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        :
        <GridList cellHeight={100} className={classes.gridList} cols={12}>
          {images.map(img => (
            <GridListTile key={img.url} cols={Math.ceil(img.width/100)} rows={Math.ceil(img.height/100)}>
              <img src={img.url} alt=""/>
              <GridListTileBar
                className={classes.tileBar}
                actionIcon={
                  <IconButton aria-label={`info about ${img.url}`} className={classes.infoIcon} onClick={() => handleModalOpen(img)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      }
      
      <ImageModal open={open} image={curImage} setOpen={setOpen} />
    </div>
  )
}
