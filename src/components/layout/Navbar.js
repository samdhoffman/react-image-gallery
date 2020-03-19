import React from "react";
import "./Navbar.scss";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  title: {
    flexGrow: 1
  },
  githubLink: {
    '&:visited': {
      color: 'inherit',
    }
  }
})

const Navbar = () => {
  const classes = useStyles();
  
  return (
    <nav className={`Navbar ${classes.root}`}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Image Gallery
          </Typography>
          <Button color="inherit">
            <a className={classes.githubLink} href="https://github.com/samdhoffman/react-image-gallery" target="_blank">
              <GitHubIcon/>
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default Navbar;
