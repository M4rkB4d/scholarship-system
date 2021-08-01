import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  alert: {
    width: '72ch'
  }
}));

const CustomSnackbar = (props) => {
  const classes = useStyles();

  const SnackBarCustom = React.forwardRef((props, ref) => (
      <Snackbar ref={ref} >
        {props.children}
      </Snackbar>
  ));

  return (
    <div className={classes.root}>
      <Snackbar
        component={SnackBarCustom}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}} 
        open={props.open} 
        onClose={props.onClose}
        autoHideDuration={3000}
      >
        <Alert 
          className={classes.alert} 
          onClose={props.onClose} 
          severity={props.severity}
        >
          { props.message }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomSnackbar
