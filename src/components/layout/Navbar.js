import React from "react";
import "./Navbar.scss";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = () => {
  const classes = useStyles();
  
  return (
    <nav className={`Navbar ${classes.root}`}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Image Gallery
          </Typography>
          <Button color="inherit">
            <GitHubIcon/>
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default Navbar;
