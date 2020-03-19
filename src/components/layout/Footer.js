import React from "react"
import "./Footer.scss"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Footer: {
    textAlign: "center",
    flexShrink: 0
  }
})

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.Footer}>
      <p>by Sam Hoffman</p>
      <p>For your consideration</p>
    </footer>
  )
}

export default Footer;
