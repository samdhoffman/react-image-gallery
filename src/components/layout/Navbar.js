import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  appBar: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  title: {
    flexGrow: 1
  },
  frontEndLinkWrapper: {
    display: "flex",
  },
  backEndLinkWrapper: {
    display: "flex",
  },
  githubLink: {
    textDecoration: "none",
    '&:visited': {
      color: 'inherit',
    }
  }
})

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <nav className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Image Gallery
          </Typography>

          <Button className={classes.frontEndLinkWrapper} color="inherit" onClick={handleClick}>
              <GitHubIcon/>
          </Button>
          
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <a className={classes.githubLink} href="https://github.com/samdhoffman/react-image-gallery" target="_blank" rel="noopener noreferrer" >
                Front End
              </a>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <a className={classes.githubLink} href="https://github.com/samdhoffman/flask_image_gallery" target="_blank" rel="noopener noreferrer" >
                Back End
              </a>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default Navbar;
