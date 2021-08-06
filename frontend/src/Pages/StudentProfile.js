import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, FormGroup, Grid, Typography } from '@material-ui/core';
import db, { storage } from '../firebase';
import { grey } from '@material-ui/core/colors';
import useLoadingIndicator from './Hooks/use-loading-indicator';
import LoadingIndicator from '../components/LoadingIndicator';
import useSnackbar from './Hooks/use-snackbar';
import CustomSnackbar from '../components/CustomSnackbar';
import NumberFormat from 'react-number-format';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {DropzoneDialogBase} from 'material-ui-dropzone'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useLoginSession from './Hooks/use-loginSession';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    textFieldAddress: {
        marginTop: theme.spacing(2),
    },
    radioButton: {
        marginTop: theme.spacing(2),
        width: '30ch'
    },
    select: {
        marginTop: theme.spacing(2),
        width: '30ch'
    },
    uploadButton: {
        marginTop: theme.spacing(1),
    },
    uploadButtonLabel: {
        marginTop: theme.spacing(2),
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

const StudentProfile = () => {
    // CSS Style
    const classes = useStyles();

    /**
     * FIREBASE
     */ 
    // Firebase States
    const [ useStudentUsers, setStudentUsers ] = useState([])
    const { useUserUid } = useLoginSession();
    // database collection path reference
    const ref = db.collection('profile')
    
    // function getStudenttUsers() {
    // // setLoading(true);
    // ref.onSnapshot((querySnapshot) => {
    //     const students = [];
    //     querySnapshot.forEach((snapshot) => {
    //     students.push(snapshot.data());
    //     })
    //     setStudentUsers(students)
    // })
    // }

    // // Use Effect
    // useEffect(() => {
    // getStudenttUsers();
    // }, [])

    // Student Profile State
    const [useStudentProfile, setStudentProfile] = useState([])

    // Input States
    const [useFirstNameInput, setUseFirstNameInput] = useState("")
    const [useLastNameInput, setUseLastNameInput] = useState("")
    const [useMiddleNameInput, setUseMiddleNameInput] = useState("")
    const [useGenderInput, setUseGenderInput] = useState("female")
    const [useAddressInput, setUseAddressInput] = useState("")
    const [useDistrictInput, setUseDistrictInput] = useState("")
    const [useZipcodeInput, setUseZipcodeInput] = useState("")
    const [useCitizenshipInput, setUseCitizenshipInput] = useState("")
    const [useSchoolInput, setUseSchoolInput] = useState("")
    const [useSchoolAddressInput, setUseSchoolAddressInput] = useState("")
    const [useCourseInput, setUseCourseInput] = useState("")
    const [useSchoolYearInput, setUseSchoolYearInput] = useState("1st Year")
    const [useContactNumberInput, setUseContactNumberInput] = useState("")
    const [useOpenUploadInput, setUseOpenUploadInput] = useState(false);
    const [useFileUploadInput, setUseFileUploadInput] = useState([]);
    const [useDownloadURL, setUseDownloadURL] = useState("")

    // Input Helper And Error Text States
    const [useValidFirstName, setUseValidFirstName] = useState({helperText: 'Enter valid first name',
                                                                error: false})
    const [useValidLastName, setUseValidLastName] = useState({helperText: 'Enter valid last name',
                                                            error: false})
    const [useValidMiddleName, setUseValidMiddleName] = useState({helperText: 'Enter valid middle name',
                                                            error: false})
    const [useValidAddress, setUseValidAddress] = useState({helperText: 'Enter valid address',
                                                            error: false})
    const [useValidDistrict, setUseValidDistrict] = useState({helperText: 'Enter valid disctrict',
                                                            error: false})
    const [useValidZipcode, setUseValidZipcode] = useState({helperText: 'Enter valid zipcode',
                                                            error: false})             
    const [useValidCitizenship, setUseValidCitizenship] = useState({helperText: 'Enter valid citizenship',
                                                            error: false})                    
    const [useValidSchool, setUseValidSchool] = useState({helperText: 'Enter valid school',
                                                            error: false})
    const [useValidSchoolAddress, setUseValidSchoolAddress] = useState({helperText: 'Enter valid school address',
                                                            error: false})                        
    const [useValidCourse, setUseValidCourse] = useState({helperText: 'Enter valid course',
                                                            error: false})                                                                                          
    const [useValidContactNumber, setUseValidContactNumber] = useState({helperText: 'Enter valid Philippine contact number starts with +63', 
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
    const validateMiddleName = (name) => {
        if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name)) {
            console.log(name, 'is not a valid middle name')
            setUseValidMiddleName({helperText: 'Enter valid middle name and remove excess white space',
                                error: true});      
        } else {
            console.log(name, 'is a valid middle name')
            setUseValidMiddleName({helperText: '',
                                error: false});
        }
    }
    const validateAddress = (address) => {
        if (!/^([a-zA-Z0-9,.'-]+\s)*[a-zA-Z0-9,.'-]+$/.test(address)) {
            console.log(address, 'is not a valid address')
            setUseValidAddress({helperText: 'Enter valid address and remove excess white space',
                                error: true});      
        } else {
            console.log(address, 'is a valid address')
            setUseValidAddress({helperText: '',
                                error: false});
        }
    }
    const validateDistrict = (district) => {
        if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(district)) {
            console.log(district, 'is not a valid district')
            setUseValidDistrict({helperText: 'Enter valid district and remove excess white space',
                                error: true});      
        } else {
            console.log(district, 'is a valid middle name')
            setUseValidDistrict({helperText: '',
                                error: false});
        }
    }
    const validateZipcode = (zipcode) => {
        if (!/^[0-9]+$/.test(zipcode)) {
            console.log(zipcode, 'is not a valid zipcode')
            setUseValidZipcode({helperText: 'Enter valid zipcode',
                                error: true});      
        } else {
            console.log(zipcode, 'is a valid zipcode')
            setUseValidZipcode({helperText: '',
                                error: false});
        }
    }
    const validateCitizenship = (citizenship) => {
        if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(citizenship)) {
            console.log(citizenship, 'is not a valid citizenship')
            setUseValidCitizenship({helperText: 'Enter valid citizenship and remove excess white space',
                                error: true});      
        } else {
            console.log(citizenship, 'is a valid middle name')
            setUseValidCitizenship({helperText: '',
                                error: false});
        }
    }
    const validateSchool = (school) => {
        if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(school)) {
            console.log(school, 'is not a valid school')
            setUseValidSchool({helperText: 'Enter valid school and remove excess white space',
                                error: true});      
        } else {
            console.log(school, 'is a valid school')
            setUseValidSchool({helperText: '',
                                error: false});
        }
    }
    const validateSchoolAddress = (schoolAddress) => {
        if (!/^([a-zA-Z0-9,.'-]+\s)*[a-zA-Z0-9,.'-]+$/.test(schoolAddress)) {
            console.log(schoolAddress, 'is not a valid school address')
            setUseValidSchoolAddress({helperText: 'Enter valid school address and remove excess white space',
                                error: true});      
        } else {
            console.log(schoolAddress, 'is a valid address')
            setUseValidSchoolAddress({helperText: '',
                                error: false});
        }
    }
    const validateCourse = (course) => {
        if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(course)) {
            console.log(course, 'is not a valid course')
            setUseValidCourse({helperText: 'Enter valid course and remove excess white space',
                                error: true});      
        } else {
            console.log(course, 'is a valid school')
            setUseValidCourse({helperText: '',
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

    // Firebase Functions
    const uploadGeneralWeightedAverage = () => {
        // Create the file metadata
        // var metadata = {
        //     contentType: useFileUploadInput[0].file.name
        // };
        
        // Upload file and metadata to the object 'images/sample.jpg'
        var uploadTask = storage.ref().child('images/' + useUserUid).putString(useFileUploadInput[0].data, 'data_url');
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
            (snapshot) => {
                console.log(snapshot)
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused': // or 'paused'
                console.log('Upload is paused');
                break;
                case 'running': // or 'running'
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
                case 'storage/canceled':
                // User canceled the upload
                break;
        
                // ...
        
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            }, 
            () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                setUseDownloadURL(downloadURL);
                createStudentProfile(downloadURL)
            });
            }
        );
    }

    function readStudentProfile() {
        // setLoading(true);
        db.collection("profile")
          .where('user_uid', '==', useUserUid)
          //.where('title', '==', 'School1') // does not need index
          //.where('score', '<=', 10)    // needs index
          //.orderBy('owner', 'asc')
          //.limit(3)
          .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setStudentProfile(items);
          });
      }
    
    
    // Use Effect
    useEffect(() => {
        // readStudentProfile();
        // console.log('use effect')
        // console.log("uid of currently login user => ", useUserUid)
        // console.log(useStudentProfile)
        readStudentProfile()
        return () => {
            readStudentProfile()
            setStudentProfile([])
        }
    }, [useUserUid])

    // readStudentProfile();
    
    // Create Student Profile
    const createStudentProfile = (url) => {
        var formattedContactNumber = useContactNumberInput.replaceAll(/[^\w\s]/gi, '').replaceAll(/\s/g,'')
        var date = new Date();
        var currentDateTime = date.toLocaleString();
        ref.doc(useUserUid)
        .set({
            user_uid: useUserUid,
            user_type: 'student',
            user_first_name: useFirstNameInput,
            user_last_name: useLastNameInput,
            user_middle_name: useMiddleNameInput,
            user_gender: useGenderInput,
            user_address: useAddressInput,
            user_district: useDistrictInput,
            user_zipcode: useZipcodeInput,
            user_citizenship: useCitizenshipInput,
            user_school: useSchoolInput,
            user_school_address: useSchoolAddressInput,
            user_course: useCourseInput,
            user_school_year: useSchoolYearInput,
            user_contact_number: formattedContactNumber,
            user_gwa_average: url,
            user_scholarship_status: "Pending",
            user_scholarship_number: 0, 
            user_last_modified: currentDateTime,           

        })
        .then(() => {
            handleCloseLoadingIndicator();
            console.log('Profile Added!')
            handleClickSnackbar()
            handleSnackbarSeverity("success")
            handleSnackbarMessage("Successfuly Submitted Profile!")
        })
        .catch((error) => {
            handleClickSnackbar();
            handleSnackbarSeverity("error");
            handleSnackbarMessage(error.message);  
            console.log(error);
            console.log(error.message)  
        })
    }
  
    // Create Data Validation
    const validateDataCreation = () => {
        const validInputs = [
            useValidFirstName.error, 
            useValidMiddleName.error,
            useValidLastName.error,
            useValidAddress.error,
            useValidDistrict.error,
            useValidZipcode.error,
            useValidCitizenship.error,
            useValidSchool.error,
            useValidSchoolAddress.error,
            useValidCourse.error,
            useValidContactNumber.error,
        ]
        const notEmptyInputs = [
            useFirstNameInput,
            useMiddleNameInput,
            useLastNameInput,
            useGenderInput,
            useAddressInput,
            useDistrictInput,
            useZipcodeInput,
            useCitizenshipInput,
            useSchoolInput,
            useSchoolAddressInput,
            useCourseInput,
            useContactNumberInput,
        ]

        const checkValidInput = (input) => { return input !== true }
        let validInputChecker = arr => arr.every(checkValidInput);

        const checkEmptyInput = (input) => { return input !== "" }
        let notEmptyInputChecker = arr => arr.every(checkEmptyInput);

        console.log("notEmptyInputChecker", notEmptyInputChecker(notEmptyInputs))
        console.log("validInputChecker(validInputs) ", validInputChecker(validInputs) )

        if(useFileUploadInput.length !== 0) {
            if (notEmptyInputChecker(notEmptyInputs) === false) {
                handleCloseLoadingIndicator();
                handleClickSnackbar();
                handleSnackbarSeverity("warning");
                handleSnackbarMessage("Fill All Required Fields"); 
            } else {
                if (validInputChecker(validInputs) === true) {
                    // Create Data If Validations Passed
                    uploadGeneralWeightedAverage()
                } else {
                    handleCloseLoadingIndicator();
                    handleClickSnackbar();
                    handleSnackbarSeverity("error");
                    handleSnackbarMessage("Invalid Inputs. Follow Validation Requirements"); 
                }
            }
        } else {
            handleCloseLoadingIndicator();
            handleClickSnackbar();
            handleSnackbarSeverity("warning");
            handleSnackbarMessage("Upload General Weighted Average Photo");
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
    const middleNameInputChangeHandler = (e) => {
        const middleName = e.target.value;
        console.log('Middle Name Input:', middleName)
        setUseMiddleNameInput(middleName)
        validateMiddleName(middleName)
    }
    const genderInputChangeHandler = (e) => {
        const gender = e.target.value;
        console.log('Gender Input:', gender)
        setUseGenderInput(gender)
    }
    const addressInputChangeHandler = (e) => {
        const address = e.target.value;
        console.log('Address Input:', address)
        setUseAddressInput(address)
        validateAddress(address)
    }
    const districtInputChangeHandler = (e) => {
        const district = e.target.value;
        console.log('District Input:', district)
        setUseDistrictInput(district)
        validateDistrict(district)
    }
    const zipcodeInputChangeHandler = (e) => {
        const zipcode = e.target.value;
        console.log('Zipcode Input:', zipcode)
        setUseZipcodeInput(zipcode)
        validateZipcode(zipcode)
    }
    const citizenshipInputChangeHandler = (e) => {
        const citizenship = e.target.value;
        console.log('Citizenship Input:', citizenship)
        setUseCitizenshipInput(citizenship)
        validateCitizenship(citizenship)
    }
    const schoolInputChangeHandler = (e) => {
        const school = e.target.value;
        console.log('School Input:', school)
        setUseSchoolInput(school)
        validateSchool(school)
    }
    const schoolAddressInputChangeHandler = (e) => {
        const schoolAddress = e.target.value;
        console.log('School Address Input:', schoolAddress)
        setUseSchoolAddressInput(schoolAddress)
        validateSchoolAddress(schoolAddress)
    }
    const courseInputChangeHandler = (e) => {
        const course = e.target.value;
        console.log('Course Input:', course)
        setUseCourseInput(course)
        validateCourse(course)
    }
    const schoolYearInputChangeHandler = (e) => {
        const schoolYear = e.target.value;
        console.log('Course Input:', schoolYear)
        setUseSchoolYearInput(schoolYear)
    }
    const contactNumberInputChangeHandler = (e) => {
        const contactNumber = e.target.value;
        console.log('Contact Number Input:', contactNumber)
        setUseContactNumberInput(contactNumber)
        validateContactNumber(contactNumber)
    }
    const uploadHandleAdd = (newFileObjs) => {
        console.log('onAdd', newFileObjs);
        setUseFileUploadInput(newFileObjs);
    }
    const uploadHandleDelete = (deleteFileObjs, number) => {
        console.log(deleteFileObjs)
        const newFileObjs = useFileUploadInput.filter(item => item !== deleteFileObjs)
        setUseFileUploadInput(newFileObjs);
    }
    const uploadHandleClose = () => {
        setUseOpenUploadInput(false)
    }
    const uploadHandleSave = () => {
        //Saving files to state for further use and closing Modal.
        setUseOpenUploadInput(false)
    }
    const uploadHandleOpen = () => {
        setUseOpenUploadInput(true)
    }
    const submitButtonClickHandler = (e) => {
        e.preventDefault();
        console.log('Submit Button Clicked!')
        handleOpenLoadingIndicator() 
        validateDataCreation();
    }

    const dialogTitle = () => (
        <>
          <span>Upload file</span>
          <IconButton
            style={{right: '12px', top: '8px', position: 'absolute'}}
            onClick={() => setUseOpenUploadInput(false)}>
            <CloseIcon />
          </IconButton>
        </>
    );


    useEffect(() => {
        if (useStudentProfile[0]) {
            setUseFirstNameInput(useStudentProfile[0].user_first_name)
            setUseLastNameInput(useStudentProfile[0].user_last_name)
            setUseMiddleNameInput(useStudentProfile[0].user_middle_name)
            setUseGenderInput(useStudentProfile[0].user_gender)
            setUseAddressInput(useStudentProfile[0].user_address)
            setUseDistrictInput(useStudentProfile[0].user_district)
            setUseZipcodeInput(useStudentProfile[0].user_zipcode)
            setUseCitizenshipInput(useStudentProfile[0].user_citizenship)
            setUseSchoolInput(useStudentProfile[0].user_school)
            setUseSchoolAddressInput(useStudentProfile[0].user_school_address)
            setUseCourseInput(useStudentProfile[0].user_course)
            setUseSchoolYearInput(useStudentProfile[0].user_school_year)
            setUseContactNumberInput(useStudentProfile[0].user_contact_number.substring(2))
        }
        
    }, [useStudentProfile])

        

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
                            PROFILE
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
                            value={useFirstNameInput} 
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
                            value={useLastNameInput} 
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField
                                required 
                                fullWidth
                                className={classes.textField} 
                                id="middle-name" 
                                label="Middle Name"
                                error={useValidMiddleName.error}
                                helperText={useValidMiddleName.helperText}
                                onChange={middleNameInputChangeHandler}
                                value={useMiddleNameInput} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel className={classes.radioButton} component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={useGenderInput} row onChange={genderInputChangeHandler}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                        <TextField
                            required 
                            fullWidth
                            className={ classes.textFieldAddress } 
                            id="address" 
                            label="Address"
                            error={ useValidAddress.error }
                            helperText={ useValidAddress.helperText }
                            onChange={ addressInputChangeHandler } 
                            value={useAddressInput}
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                        <TextField
                            required 
                            fullWidth
                            className={classes.textField} 
                            id="district" 
                            label="District"
                            error={useValidDistrict.error}
                            helperText={useValidDistrict.helperText}
                            onChange={districtInputChangeHandler}  
                            value={useDistrictInput}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required  
                            fullWidth
                            className={classes.textField} 
                            id="zipcode" 
                            label="Zipcode" 
                            error={useValidZipcode.error}
                            helperText={useValidZipcode.helperText}
                            onChange={zipcodeInputChangeHandler}
                            value={useZipcodeInput}
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                        <TextField
                            required 
                            fullWidth
                            className={classes.textField} 
                            id="citizenship" 
                            label="Citizenship"
                            error={useValidCitizenship.error}
                            helperText={useValidCitizenship.helperText}
                            onChange={citizenshipInputChangeHandler} 
                            value={useCitizenshipInput}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required  
                            fullWidth
                            className={classes.textField} 
                            id="school" 
                            label="School" 
                            error={useValidSchool.error}
                            helperText={useValidSchool.helperText}
                            onChange={schoolInputChangeHandler} 
                            value={useSchoolInput}
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                        <TextField
                            required 
                            fullWidth
                            className={classes.textFieldAddress} 
                            id="school-address" 
                            label="School Address"
                            error={useValidSchoolAddress.error}
                            helperText={useValidSchoolAddress.helperText}
                            onChange={schoolAddressInputChangeHandler} 
                            value={useSchoolAddressInput}
                        />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField
                                required  
                                fullWidth
                                className={classes.textField} 
                                id="course" 
                                label="Course" 
                                error={useValidCourse.error}
                                helperText={useValidCourse.helperText}
                                onChange={courseInputChangeHandler} 
                                value={useCourseInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel className={classes.select} id="school-year-label">School Year</InputLabel>
                            <Select
                                labelId="school-year-label"
                                id="school-year-select"
                                value={useSchoolYearInput}
                                fullWidth
                                onChange={schoolYearInputChangeHandler} 
                            >
                                <MenuItem value={"1st Year"}>1st Year</MenuItem>
                                <MenuItem value={"2nd Year"}>2nd Year</MenuItem>
                                <MenuItem value={"3rd Year"}>3rd Year</MenuItem>
                                <MenuItem value={"4th Year"}>4th Year</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <FormLabel 
                                className={classes.uploadButtonLabel} 
                                component="legend"
                            >
                                General Weighted Average
                            </FormLabel>
                            <Button 
                                className = {classes.uploadButton} 
                                fullWidth 
                                size="small"
                                variant="outlined" 
                                color="primary" 
                                onClick={uploadHandleOpen}
                            >
                                Upload
                            </Button>
                            <DropzoneDialogBase
                                dialogTitle={dialogTitle()}
                                fileObjects={useFileUploadInput}
                                onAdd={uploadHandleAdd}
                                open={useOpenUploadInput}
                                onSave={uploadHandleSave}
                                onDelete={uploadHandleDelete}
                                filesLimit={1}
                                acceptedFiles={['image/*']}
                                showPreviews={true}
                                maxFileSize={5000000}
                                onClose={uploadHandleClose}
                                showPreviews={true}
                                showFileNamesInPreview={true}
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
                                value={useContactNumberInput}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                        <Button 
                            className={classes.button} 
                            fullWidth 
                            size="large" 
                            variant="contained" 
                            color="primary"
                            onClick = {submitButtonClickHandler} 
                        >
                            Submit                    
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

export default StudentProfile
