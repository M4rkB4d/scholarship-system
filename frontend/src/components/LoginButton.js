import React from 'react'
// Material React Component
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useOpenModal from '../Pages/Hooks/use-openModal';
import Login from '../Pages/Login';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    modal: {
        margin: theme.spacing(10),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    control: {
        padding: theme.spacing(2),
    },
    form: {
    '& > *': {
        margin: theme.spacing(2.9),
        width: '45ch',
        // justifyContent: 'center',
    },
        width: "50ch"
    }
  }));

const LoginButton = (props) => {
    const classes = useStyles();
    const { useOpenModal: isModalOpen, openChangeHandler: openModalChangeHandler, closeChangeHandler: closeModalChangeHandler} = useOpenModal()

    return (
        <div>
            <Button 
            // component={Link} to="/login" 
            color="inherit" 
            onClick={openModalChangeHandler}>Login</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={closeModalChangeHandler}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                <Login onClick={closeModalChangeHandler}></Login>
                </Fade>
            </Modal>       
        </div>
    )
}

export default LoginButton
