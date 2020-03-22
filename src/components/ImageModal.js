import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& img": {
      marginTop: 20
    }
  },
}));

export default function ImageModal({ open, image, setOpen }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal 
        aria-labelledby="image-modal"
        aria-describedby="modal-to-display-selected-image" 
        className={classes.modal}
        open={open} 
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={image.url} alt="" />
            <section style={{width: image.width}}>
              <p>Width: {image.width}</p>
              <p>Height: {image.height}</p>
            </section>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
