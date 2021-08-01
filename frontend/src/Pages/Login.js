import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {Box, 
        Button, 
        Divider, 
        FormGroup, 
        Grid, 
        Typography} from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import useLoadingIndicator from './Hooks/use-loading-indicator';
import LoadingIndicator from '../components/LoadingIndicator';
import useSnackbar from './Hooks/use-snackbar';
import CustomSnackbar from '../components/CustomSnackbar';
import db, { auth } from '../firebase';
import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import useLoginSession from './Hooks/use-loginSession';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        // width: '70ch'
    },
    divider: {
      backgroundColor: grey[400]
    },
    textField: {
      marginTop: theme.spacing(2),
      width: '55ch'
    },
    button: {
      marginTop: theme.spacing(8),
    }, 
    typography: {
      marginTop: theme.spacing(0),
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
}));

const Login = (props) => {
    const classes = useStyles();

    // Input States
    const [useUsernameInput, setUseUsernameInput] = useState("")
    const [usePasswordInput, setUsePasswordInput] = useState("")

    // Loading Indicator State And Handlers 
    const { useLoadingIndicator: isLoadingIndicator, 
            handleOpen: handleOpenLoadingIndicator, 
            handleClose: handleCloseLoadingIndicator } = useLoadingIndicator();
    const { useOpenSnackbar, 
            useSnackbarSeverity, 
            useSnackbarMessage, 
            handleSnackbarSeverity, 
            handleClickSnackbar, 
            handleCloseSnackbar, 
            handleSnackbarMessage } = useSnackbar()

    const login = (username, password) => {
        handleOpenLoadingIndicator()
        auth.signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // console.log(user)
            // ...
            props.closeModal()
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            handleCloseLoadingIndicator()
            handleClickSnackbar()
            handleSnackbarSeverity("error")
            handleSnackbarMessage(errorMessage)
            
        });
    };

    
    
    // Input Handlers
    // parameter `e` means `event`
    const usernameInputChangeHandler = (e) => {
        const username = e.target.value;
        console.log('Username: ', username);
        setUseUsernameInput(username);
    }
    const passwordInputChangeHandler = (e) => {
        const password = e.target.value;
        console.log('Password: ', password);
        setUsePasswordInput(password);
    }
    const loginButtonClickHandler = (e) => {
        e.preventDefault();
        console.log('Login Button Clicked!')
        login(useUsernameInput, usePasswordInput)
    }

    // if (loading) {
    //     console.log(loading)
    //     // return handleOpenLoadingIndicator()
    //   }
    // if (error) {
    //     console.log(error)
    //     // return (
    //     //     handleCloseLoadingIndicator(),
    //     //     handleClickSnackbar(),
    //     //     handleSnackbarSeverity("error"),
    //     //     handleSnackbarMessage(error.message)
    //     // )

    // }
    // if (user) {
    //     console.log(user)
    //     // return (handleCloseLoadingIndicator(),
    //     // handleClickSnackbar(),
    //     // handleSnackbarSeverity("success"),
    //     // handleSnackbarMessage("Login Success!"),
    //     // props.onClick())
    // }

    return (      
        <Box  pt={3} className={classes.box}>
            <CustomSnackbar 
                open={useOpenSnackbar} 
                onClose={handleCloseSnackbar}
                severity={useSnackbarSeverity}
                message={useSnackbarMessage}
            />
            <Paper className={classes.paper}> 
                <form className={classes.form} noValidate autoComplete="off">
                    <FormGroup className={classes.formGroup} noValidate autoComplete="on" >
                        <Box m={5}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography align="center" className={classes.typography} variant="h4" color='textPrimary'>
                                        LOGIN
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <Divider className={classes.divider}  variant="middle" />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        className={classes.textField} 
                                        id="username" 
                                        label="Username"
                                        onChange={usernameInputChangeHandler} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth
                                        className={classes.textField} 
                                        id="password" 
                                        label="Password"
                                        type="password"
                                        onChange={passwordInputChangeHandler} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item xs={6}>
                                    <Button 
                                        className = {classes.button} 
                                        fullWidth 
                                        size="large" 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={props.onClick}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button 
                                        className={classes.button} 
                                        fullWidth 
                                        size="large" 
                                        variant="contained" 
                                        color="primary"
                                        onClick = {loginButtonClickHandler} 
                                    >
                                        Login                    
                                    </Button>
                                    
                                </Grid>
                            </Grid>
                            <LoadingIndicator open={isLoadingIndicator}/>
                        </Box>
                    </FormGroup>            
                </form>
            </Paper>  
        </Box>
    )
}

export default Login
