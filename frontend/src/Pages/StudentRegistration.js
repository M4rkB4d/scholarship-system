import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, FormGroup, Grid, Typography } from '@material-ui/core';
import db, { auth } from '../firebase';
import { grey } from '@material-ui/core/colors';
import useLoadingIndicator from './Hooks/use-loading-indicator';
import LoadingIndicator from '../components/LoadingIndicator';
import useSnackbar from './Hooks/use-snackbar';
import CustomSnackbar from '../components/CustomSnackbar';
import NumberFormat from 'react-number-format';

// CSS Styles Object
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
    width: '30ch'
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

const StudentRegistration = () => {

  // CSS Style
  const classes = useStyles();

  // Firebase 
  const ref = db.collection('users')
  function getStudenttUsers() {
    // setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const students = [];
      querySnapshot.forEach((snapshot) => {
        students.push(snapshot.data());
      })
      setStudentUsers(students)
    })
  }

  // Use Effect
  useEffect(() => {
    getStudenttUsers();
  }, [])

  // Firebase States
  const [useStudentUsers, setStudentUsers] = useState([])
  // Firebase Log States
  // console.log(useStudentUsers)

  // Input States
  const [useFirstNameInput, setUseFirstNameInput] = useState("")
  const [useLastNameInput, setUseLastNameInput] = useState("")
  const [useEmailInput, setUseEmailInput] = useState("")
  const [useContactNumberInput, setUseContactInput] = useState("")
  const [usePasswordInput, setUsePasswordInput] = useState("")
  const [useConfirmPasswordInput, setUseConfirmPasswordInput] = useState("")
  
  // Input Helper And Error Text States
  const [useValidFirstName, setUseValidFirstName] = useState({helperText: 'Enter valid first name',
                                                              error: false})
  const [useValidLastName, setUseValidLastName] = useState({helperText: 'Enter valid last name',
                                                            error: false})
  const [useValidEmail, setUseValidEmail] = useState({helperText: 'Enter valid email address', 
                                                      error: false})
  const [useValidContactNumber, setUseValidContactNumber] = useState({helperText: 'Enter valid Philippine contact number starts with +63', 
                                                                      error: false})
  const [useValidPassword, setUseValidPassword] = useState({helperText: 'Should contain at least one digit, one lower case, one upper case, 8 from the mentioned characters', 
                                                            error: false})
  const [useValidConfirmPassword, setUseValidConfirmPassword] = useState({helperText: 'Passwords should match', 
                                                                          error: false})
  
  // Loading Indicator State And Handlers 
  const { useLoadingIndicator: isLoadingIndicator, 
          handleOpen: handleOpenLoadingIndicator, 
          handleClose: handleCloseLoadingIndicator } = useLoadingIndicator();
  const {useOpenSnackbar, 
        useSnackbarSeverity, 
        useSnackbarMessage, 
        handleSnackbarSeverity, 
        handleClickSnackbar, 
        handleCloseSnackbar, 
        handleSnackbarMessage} = useSnackbar()

  // Input Validations
  const validateFirstName = (name) => {  
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name)) {
      console.log(name, 'is not a valid first name')
      setUseValidFirstName({helperText: 'Enter valid first name and remove excess white space',
                            error: true});      
    } else {
      console.log(name, 'is a valid first name')
      setUseValidFirstName({helperText: '',
                            error: false});
    }
  }
  const validateLastName = (name) => {
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name)) {
      console.log(name, 'is not a valid last name')
      setUseValidLastName({helperText: 'Enter valid last name and remove excess white space',
                            error: true});      
    } else {
      console.log(name, 'is a valid last name')
      setUseValidLastName({helperText: '',
                            error: false});
    }
  }
  const validateEmail = (email) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      console.log(email, 'is not a valid email')
      setUseValidEmail({helperText: 'Enter valid email',
                            error: true});      
    } else {
      console.log(email, 'is a valid email')
      setUseValidEmail({helperText: '',
                            error: false});
    }
  }
  const validateContactNumber = (contactNumber) => {
    var formattedContactNumber = contactNumber.replaceAll(/[^\w\s]/gi, '').replaceAll(/\s/g,'')
    console.log("Formatted Contact Number: ", formattedContactNumber)
    if (!/^(\+639)\d{9}$/.test("+" + formattedContactNumber)) {
      console.log(formattedContactNumber, 'is not a valid contact number')
      setUseValidContactNumber({helperText: 'Enter valid Philippine contact number starts with +63',
                            error: true});      
    } else {
      console.log(formattedContactNumber, 'is a valid contact number')
      setUseValidContactNumber({helperText: '',
                            error: false});
    }
  }
  const validatePassword = (password) => {
    if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      console.log(password, 'is not a valid password')
      setUseValidPassword({helperText: 'Should contain 8 characters at least 1 digit, 1 lower case, 1 upper case, and 1 special character',
                            error: true});      
    } else {
      console.log(password, 'is a valid password')
      setUseValidPassword({helperText: '',
                            error: false});
    }
  }
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== usePasswordInput) {
      console.log(confirmPassword, 'is not a password match from entered password')
      setUseValidConfirmPassword({helperText: 'Passwords dont match',
                            error: true});      
    } else {
      console.log(confirmPassword, 'is a password match from entered password')
      setUseValidConfirmPassword({helperText: '',
                            error: false});
    }
  }

  // Firebase Functions
  function writeUserStudentData() {
    // add user to authentication
    auth.createUserWithEmailAndPassword(
      useEmailInput,
      usePasswordInput
    ).then((user) => {
      console.log("User Email and Password Added!")
      console.log(user); // added user object
      console.log(user.user.uid); // added user uid

      var formattedContactNumber = useContactNumberInput.replaceAll(/[^\w\s]/gi, '').replaceAll(/\s/g,'')
      // add user to firestore database  
      ref
      .doc(user.user.uid)
      .set({
        user_uid: user.user.uid,
        user_type: 'student',
        user_first_name: useFirstNameInput,
        user_last_name: useLastNameInput,
        user_contact_number: formattedContactNumber
      })
      .then(() => {
        handleCloseLoadingIndicator();
        console.log('User Added!')
        handleClickSnackbar()
        handleSnackbarSeverity("success")
        handleSnackbarMessage("Successfuly Registered!")
      })
      .catch((error) => {
        handleClickSnackbar();
        handleSnackbarSeverity("error");
        handleSnackbarMessage(error.message);  
        console.log(error);
        console.log(error.message)  
      })

    }).catch((error) => {
      handleCloseLoadingIndicator();
      handleClickSnackbar();
      handleSnackbarSeverity("error");
      handleSnackbarMessage(error.message);  
      console.log(error);
      console.log(error.message)
    })
  }

  // Create Data Validation
  
  const validateDataCreation = () => {
    const validInputs = [useValidFirstName.error, 
      useValidLastName.error,
      useValidContactNumber.error,
      useValidEmail.error, 
      useValidPassword.error,
      useValidConfirmPassword.error]
    const notEmptyInputs = [useFirstNameInput,
      useLastNameInput,
      useEmailInput,
      useContactNumberInput,
      usePasswordInput,
      useConfirmPasswordInput
    ]

    console.log(useValidFirstName.error, 
      useValidLastName.error,
      useValidContactNumber.error,
      useValidEmail.error, 
      useValidPassword.error,
      useValidConfirmPassword.error)

    const checkValidInput = (input) => { return input !== true }
    let validInputChecker = arr => arr.every(checkValidInput);
  
    const checkEmptyInput = (input) => { return input !== "" }
    let notEmptyInputChecker = arr => arr.every(checkEmptyInput);

    console.log("notEmptyInputChecker", notEmptyInputChecker(notEmptyInputs))
    console.log("validInputChecker(validInputs) ", validInputChecker(validInputs) )

    if (notEmptyInputChecker(notEmptyInputs) === false) {
      handleCloseLoadingIndicator();
      handleClickSnackbar();
      handleSnackbarSeverity("warning");
      handleSnackbarMessage("Fill All Required Fields"); 
    } else {
      if (validInputChecker(validInputs) === true) {
        writeUserStudentData();
      } else {
        handleCloseLoadingIndicator();
        handleClickSnackbar();
        handleSnackbarSeverity("error");
        handleSnackbarMessage("Invalid Inputs. Follow Validation Requirements"); 
      }
    }
  } 

  // Input Handlers
  // parameter `e` means `event`
  const firstNameInputChangeHandler = (e) => {
    const firstName = e.target.value;
    console.log('First Name Input:', firstName)
    setUseFirstNameInput(firstName)
    validateFirstName(firstName)
  }
  const lastNameInputChangeHandler = (e) => {
    const lastName = e.target.value;
    console.log('Last Name Input:', lastName)
    setUseLastNameInput(lastName)
    validateLastName(lastName)
  }
  const emailInputChangeHandler = (e) => {
    const email = e.target.value;
    console.log('Email Input:', email)
    setUseEmailInput(email)
    validateEmail(email)
  }
  const contactNumberInputChangeHandler = (e) => {
    const contactNumber = e.target.value;
    console.log('Contact Number Input:', contactNumber)
    setUseContactInput(contactNumber)
    validateContactNumber(contactNumber)
  }
  const paswordInputChangeHandler = (e) => {
    const password = e.target.value;
    console.log('Password Input:', password)
    setUsePasswordInput(password)
    validatePassword(password)
  }
  const confirmPaswordInputChangeHandler = (e) => {
    const confirmPassword = e.target.value;
    console.log('Confirm Password Input:', confirmPassword)
    setUseConfirmPasswordInput(confirmPassword)
    validateConfirmPassword(confirmPassword)
  }
  const clearButtonClickHandler = (e) => {
    e.preventDefault();
    console.log('Clear Button Clicked!')
    console.log(useStudentUsers)
  } 
  const registerButtonClickHandler = (e) => {
    e.preventDefault();
    console.log('Register Button Clicked!')
    handleOpenLoadingIndicator() 
    validateDataCreation();
  }

  // Return Custom Component
  return (
    <Box pt={3} className={classes.box}>
      <CustomSnackbar 
        open={useOpenSnackbar} 
        onClose={handleCloseSnackbar}
        severity={useSnackbarSeverity}
        message={useSnackbarMessage}
      />
      <Paper className={classes.paper}> 
          <form className={classes.form} noValidate autoComplete="off" action="">
              <FormGroup className={classes.formGroup} noValidate autoComplete="on" row>
                  <Box m={5}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Typography align="center" className={classes.typography} variant="h4" color='textPrimary'>
                          REGISTER
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <Divider className={classes.divider}  variant="middle" />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <TextField
                          required 
                          fullWidth
                          className={classes.textField} 
                          id="first-name" 
                          label="First Name"
                          error={useValidFirstName.error}
                          helperText={useValidFirstName.helperText}
                          onChange={firstNameInputChangeHandler} 
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required  
                          fullWidth
                          className={classes.textField} 
                          id="last-name" 
                          label="Last Name" 
                          error={useValidLastName.error}
                          helperText={useValidLastName.helperText}
                          onChange={lastNameInputChangeHandler}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <TextField
                          required  
                          fullWidth
                          className={classes.textField} 
                          id="email-name" 
                          label="Email" 
                          error={useValidEmail.error}
                          helperText={useValidEmail.helperText}
                          onChange={emailInputChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <NumberFormat
                          required  
                          fullWidth
                          className={classes.textField} 
                          id="contact-number" 
                          label="Contact No." 
                          error={useValidContactNumber.error}
                          helperText={useValidContactNumber.helperText}
                          onChange={contactNumberInputChangeHandler}
                          format="+63 (###) ###-####" 
                          allowEmptyFormatting mask="_"
                          customInput={TextField}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <TextField
                          required
                          fullWidth
                          type="password" 
                          className={classes.textField} 
                          id="password" 
                          label="Password"
                          error={useValidPassword.error}
                          helperText={useValidPassword.helperText}
                          onChange={paswordInputChangeHandler} 
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required 
                          fullWidth
                          type="password"
                          className={classes.textField} 
                          id="confirm-password" 
                          label="Confirm Password" 
                          error={useValidConfirmPassword.error}
                          helperText={useValidConfirmPassword.helperText}
                          onChange={confirmPaswordInputChangeHandler}
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
                          onClick = {clearButtonClickHandler}
                        >
                          Clear
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button 
                          className={classes.button} 
                          fullWidth 
                          size="large" 
                          variant="contained" 
                          color="primary"
                          onClick = {registerButtonClickHandler} 
                        >
                          Register                    
                        </Button>
                        <LoadingIndicator open={isLoadingIndicator}/>
                      </Grid>
                    </Grid>
                  </Box>   
              </FormGroup>            
          </form>
      </Paper>
    </Box>
  );
}

export default StudentRegistration
