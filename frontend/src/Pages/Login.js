import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, FormGroup, Typography } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        width: '55ch'
    },
    control: {
      padding: theme.spacing(2),
    },
    form: {
    width: "100%",
    height: "100%",
    },
    formGroup: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    textField: {
        margin: theme.spacing(2),
        width: "45ch",
    },
    button: {
        margin: theme.spacing(3),
        // width: "90%",
    }, 
    buttonGroup: {
        marginTop: theme.spacing(7),
    },
    typography: {
        marginTop: theme.spacing(2),
    }
  }));

const Login = (props) => {
    const classes = useStyles();
  
    return (      
        <Paper className={classes.paper}> 
            <form className={classes.form} noValidate autoComplete="off">
                <FormGroup className={classes.formGroup} noValidate autoComplete="on" >
                    <Typography className={classes.typography} variant="h4" color='inherit'>
                    Login
                    </Typography>
                    <TextField className={classes.textField} id="standard-basic" label="Username" />
                    <TextField className={classes.textField} id="standard-basic" label="Password" />
                    <ButtonGroup className={classes.buttonGroup}>
                        <Button size='large' onClick={props.onClick} fullWidth={true} className={classes.button} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button size='large' fullWidth={true} className={classes.button} variant="contained" color="primary">
                            Login                    
                        </Button>    
                    </ButtonGroup>   
                </FormGroup>            
            </form>
        </Paper>  
    )
}

export default Login
