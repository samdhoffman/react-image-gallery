import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DimensionDropdown from './DimensionDropdown';
import GrayscaleToggle from './GrayscaleToggle';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 20
  },
}));

export default function ControlPanel({ fetchFilteredData, toggleGrayscale }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={2} alignItems="center">
        <Grid item>
          <DimensionDropdown fetchFilteredData={fetchFilteredData} />
        </Grid>
        <Grid item>
          <GrayscaleToggle toggleGrayscale={toggleGrayscale} />
        </Grid>
      </Grid>
    </div>
  )
}
