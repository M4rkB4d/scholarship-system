import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
    //   height: 140,
      width: 600
    },
    control: {
      padding: theme.spacing(2),
    },
    form: {
    '& > *': {
        margin: theme.spacing(5),
        width: '25ch',
    },
    width: "70ch"
    }, 
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  }));

const InputForm = () => {
    const classes = useStyles();

    return (
        <Box pt={2} className={classes.box}>            
            <Paper> 
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="First Name" />
                    <TextField id="standard-basic" label="Last Name" />
                    <TextField id="standard-basic" label="Email" />
                    <TextField id="standard-basic" label="Contact No." />
                    <TextField id="standard-basic" label="Password" />
                    <TextField id="standard-basic" label="Confirm Password" />
                </form>
            </Paper>
        </Box>      
    );
}

export default InputForm
