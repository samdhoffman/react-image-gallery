import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
}));

export default function ErrorPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Something went wrong...
    </div>
  )
}
