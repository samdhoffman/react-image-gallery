import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import doctor_reading from '../static/doctor_reading.jpg';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly"
  },
  drReadingImg: {
    height: 400,
    width: 500
  },
  h5: {
    display: "inline"
  },
  homeBtn: {
    margin: "0 5px"
  }
}));

export default function NoResults() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <section className="photoContainer">
        <img className={classes.drReadingImg} src={doctor_reading} alt="No matching images" />
      </section>
      <section>
        <h2>Your Results Came Back Negative</h2>
        <h5 className={classes.h5}>Try another search or return</h5>
        <span className={classes.homeBtn}>
          <Button variant="contained" href="/">Home</Button>
        </span>
      </section>
    </div>
  )
}
