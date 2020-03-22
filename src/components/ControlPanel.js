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

export default function ControlPanel({ fetchFilteredData, toggleGrayscale, handleFilterChange, isDisabled }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root} spacing={2} alignItems="center">
        <Grid item>
          <DimensionDropdown fetchFilteredData={fetchFilteredData} handleFilterChange={handleFilterChange} isDisabled={isDisabled} />
        </Grid>
        <Grid item>
          <GrayscaleToggle toggleGrayscale={toggleGrayscale} isDisabled={isDisabled} />
        </Grid>
      </Grid>
    </div>
  )
}
