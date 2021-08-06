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
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from "material-table";
import useLoginSession from './Hooks/use-loginSession';

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

const Scholars = () => {

    // CSS Style
    const classes = useStyles();

    // database collection path reference
    const studentProfile = db.collection('profile')
    // Student Profile State
    const [useStudentProfile, setStudentProfile] = useState([])
    const { useUserUid } = useLoginSession();

    function readApplicants() {
    // setLoading(true);
    studentProfile
        .where('user_scholarship_status', '==', 'Approve') // does not need index
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

    const updateApplicantStatus = (userUid, status) => {
        var date = new Date();
        var currentDateTime = date.toLocaleString();
        var scholarshipNumber = (status == "Approve") ? Math.floor((Math.random() * 9000) + 1000) : 0;
        studentProfile
        .doc(userUid)
        .update({
            user_scholarship_status: status,
            user_scholarship_number: scholarshipNumber,
            user_last_modified: currentDateTime,
        })
        .then(() => {
            // handleCloseLoadingIndicator();
            // console.log('User Added!')
            handleClickSnackbar()
            handleSnackbarSeverity("success")
            handleSnackbarMessage(`Successfuly ${status}ed Scholarship!`)
        })
        .catch((error) => {
            handleClickSnackbar();
            handleSnackbarSeverity("error");
            handleSnackbarMessage(error.message);  
            console.log(error);
            console.log(error.message)   
        })
    }

    // Use Effect
    useEffect(() => {
        // readStudentProfile();
        // console.log('use effect')
        // console.log("uid of currently login user => ", useUserUid)
        // console.log(useStudentProfile)
        readApplicants()
        return () => {
            readApplicants()
            setStudentProfile([])
        }
    }, [useUserUid])

    // useEffect(() => {
    //     if (useStudentProfile[0]) {
    //         // setUseFirstNameInput(useStudentProfile[0].user_first_name)
    //     }
        
    // }, [useStudentProfile])

    const {useOpenSnackbar, 
        useSnackbarSeverity, 
        useSnackbarMessage, 
        handleSnackbarSeverity, 
        handleClickSnackbar, 
        handleCloseSnackbar, 
        handleSnackbarMessage} = useSnackbar()

    const onClickApproveButton = (event, rowData) => {
        updateApplicantStatus(rowData.user_uid, 'Approve')
    }

    const onClickBlockButton = (event, rowData) => {
        updateApplicantStatus(rowData.user_uid, 'Block')
    }

    return (
        <Box pt={3} className={classes.box}>
            <CustomSnackbar 
                open={useOpenSnackbar} 
                onClose={handleCloseSnackbar}
                severity={useSnackbarSeverity}
                message={useSnackbarMessage}
            />
            <Paper>
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
                    <MaterialTable
                        title="Scholars"
                        columns={[
                            { title: 'Last Name', field: 'user_first_name' },
                            { title: 'First Name', field: 'user_last_name' },
                            { title: 'Middle Name', field: 'user_middle_name' },
                            { title: 'Gender', field: 'user_gender' },
                            { title: 'Contact Number', field: 'user_contact_number' },
                            { title: 'Course', field: 'user_course' },
                            { title: 'School Year', field: 'user_school_year' },
                            { title: 'Scholarship Status', field: 'user_scholarship_status' },
                            // { title: 'Surname', field: 'surname' },
                            // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                            // {
                            // title: 'Birth Place',
                            // field: 'birthCity',
                            // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                            // },
                        ]}
                        data={useStudentProfile}        
                        actions={[
                            {
                            icon: 'check',
                            tooltip: 'Approve',
                              onClick: onClickApproveButton
                            },
                            {
                            icon: 'close',
                            tooltip: 'Block',
                              onClick: onClickBlockButton
                            }
                        ]}
                        detailPanel={[
                            {
                                tooltip: 'Show GWA',
                                render: rowData => {
                                    return (
                                        <img
                                        width="100%"
                                        height="700px"
                                        src={rowData.user_gwa_average}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullscreen
                                        />
                                    )
                                },
                            },
                        ]}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default Scholars
