import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Box, Button, FormGroup, Typography } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
      width: '60ch'
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
      width: "25ch",
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
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Register = () => {

  const classes = useStyles();

  return (
    <Box pt={3} className={classes.box}> 
      <Paper className={classes.paper}> 
          <form className={classes.form} noValidate autoComplete="off">
              <FormGroup className={classes.formGroup} noValidate autoComplete="on" row>
                  <Typography className={classes.typography} variant="h4" color='inherit'>
                  Register
                  </Typography>   
              </FormGroup>
              <FormGroup className={classes.formGroup} noValidate autoComplete="on" row>
                  <TextField className={classes.textField} id="standard-basic" label="First Name" />
                  <TextField className={classes.textField} id="standard-basic" label="Last Name" />
                  <TextField className={classes.textField} id="standard-basic" label="Email" />
                  <TextField className={classes.textField} id="standard-basic" label="Contact No." />
                  <TextField className={classes.textField} id="standard-basic" label="Password" />
                  <TextField className={classes.textField} id="standard-basic" label="Confirm Password" />   
              </FormGroup>
              <FormGroup className={classes.formGroup} noValidate autoComplete="on" row>
                  <ButtonGroup className={classes.buttonGroup}>
                      <Button size='large' fullWidth={true} className={classes.button} variant="contained" color="secondary">
                          Clear
                      </Button>
                      <Button size='large' fullWidth={true} className={classes.button} variant="contained" color="primary">
                          Login                    
                      </Button>    
                  </ButtonGroup>   
              </FormGroup>            
          </form>
      </Paper>
    </Box>

  );
}

export default Register
