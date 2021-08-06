import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, FormGroup, Grid, Typography } from '@material-ui/core';
import db, { auth } from '../firebase';
import { green, grey } from '@material-ui/core/colors';
import useLoadingIndicator from './Hooks/use-loading-indicator';
import LoadingIndicator from '../components/LoadingIndicator';
import useSnackbar from './Hooks/use-snackbar';
import CustomSnackbar from '../components/CustomSnackbar';
import NumberFormat from 'react-number-format';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from "material-table";
import useLoginSession from './Hooks/use-loginSession';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';

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
    },
    listItem: {
        width: '60ch'
    },
    customHoverFocus: {
        "&:hover, &.Mui-focusVisible": { backgroundColor: green[700] }
    },
  }));

const Scholarship = () => {
    // CSS Style
    const classes = useStyles();

    // database collection path reference
    const ref = db.collection('profile')
    // Student Profile State
    const [useStudentProfile, setStudentProfile] = useState([])
    const { useUserUid } = useLoginSession();
    
    function readScholarship() {
    // setLoading(true);
    ref
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
        readScholarship()
        return () => {
            readScholarship()
            setStudentProfile([])
        }
    }, [useUserUid])

    const [useFirstName, setFirstName] = useState()
    const [useLastName, setLastName] = useState()
    const [useMiddleName, setMiddleName] = useState()
    const [useCourse, setCourse] = useState()
    const [useSchool, setSchool] = useState()
    const [useSchoolYear, setSchoolYear] = useState()
    const [useModifiedTime, setModifiedTime] = useState()
    const [useScholarNumber, setScholarNumber] = useState()
    const [useDateReleased, setDateReleased] = useState()
    const [useScholarshipAmount, setScholarshipAmount] = useState()
    const [useScholarshipStatus, setScholarshipStatus] = useState()

    const {useOpenSnackbar, 
        useSnackbarSeverity, 
        useSnackbarMessage, 
        handleSnackbarSeverity, 
        handleClickSnackbar, 
        handleCloseSnackbar, 
        handleSnackbarMessage} = useSnackbar()

    const onClickReceiveButton = () => {
        handleClickSnackbar()
        handleSnackbarSeverity("success")
        handleSnackbarMessage("Successfuly Received Scholarship!")
    }

    const timeDifference = (current, previous) => {
    
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        
        var elapsed = current - previous;
        
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
        
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
             return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
        
        else if (elapsed < msPerYear) {
             return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        
        else {
             return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }
    

    useEffect(() => {
        if (useStudentProfile[0]) {
            setFirstName(useStudentProfile[0].user_first_name)
            setMiddleName(useStudentProfile[0].user_middle_name)
            setLastName(useStudentProfile[0].user_last_name)
            setCourse(useStudentProfile[0].user_course)
            setSchool(useStudentProfile[0].user_school)
            setSchoolYear(useStudentProfile[0].user_school_year)
            setModifiedTime(timeDifference(new Date(), new Date(useStudentProfile[0].user_last_modified)))
            setScholarNumber(useStudentProfile[0].user_scholarship_number)
            setScholarshipStatus(useStudentProfile[0].user_scholarship_status)
        }
        
    }, [useStudentProfile])

    return (
        <Box pt={3} className={classes.box}>
            <CustomSnackbar 
                open={useOpenSnackbar} 
                onClose={handleCloseSnackbar}
                severity={useSnackbarSeverity}
                message={useSnackbarMessage}
            />
            <Paper> 
                <form noValidate autoComplete="off" action="">
                    <FormGroup className={classes.formGroup} noValidate autoComplete="on" row>
                        <Box m={5}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography align="center" className={classes.typography} variant="h4" color='textPrimary'>
                                        SCHOLARSHIP
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
                                    <Paper>
                                        <List>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Name" secondary={useLastName + ", " + useFirstName + " " + useMiddleName} />
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Course" secondary={useCourse} />
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="School" secondary={useSchool} />
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="School Year" secondary={useSchoolYear} />
                                            </ListItem>
                                        </List>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper>
                                        <List>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Update" secondary={useModifiedTime}/>
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Scholar Number" secondary={useScholarNumber} />
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Date Released" secondary={ (useScholarshipStatus === "Block") ? "NaN" : new Date().toLocaleDateString()} />
                                            </ListItem>
                                            <ListItem className={classes.listItem}>
                                                <ListItemText primary="Amount" secondary="₱10,000" />
                                            </ListItem>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" className={classes.customHoverFocus} onClick={onClickReceiveButton}>
                                                    <CheckCircle/>
                                                </IconButton>
                                                <ListItemText primary="Receive" centered secondary="click checkmark to receive" />
                                            </ListItemSecondaryAction>
                                        </List>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>   
                    </FormGroup>            
                </form>
            </Paper>
        </Box>
    )
}

export default Scholarship
