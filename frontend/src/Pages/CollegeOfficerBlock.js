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

const CollegeOfficerBlock = () => {

    // CSS Style
    const classes = useStyles();

    // database collection path reference
    const users = db.collection('users')
    // Student Profile State
    const [useScholarshipOfficerProfile, setScholarshipOfficerProfile] = useState([])
    const { useUserUid } = useLoginSession();

    const {useOpenSnackbar, 
        useSnackbarSeverity, 
        useSnackbarMessage, 
        handleSnackbarSeverity, 
        handleClickSnackbar, 
        handleCloseSnackbar, 
        handleSnackbarMessage} = useSnackbar()

    function readApplicants() {
        // setLoading(true);
        users
        .where('user_type', '==', 'scholarship officer') // does not need index
        //.where('score', '<=', 10)    // needs index
        //.orderBy('owner', 'asc')
        //.limit(3)
        .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        setScholarshipOfficerProfile(items);
        });
    }

    const deleteScholarshipOfficer = (userUid) => {
        users
        .doc(userUid)
        .delete()
        .then(() => {
            // handleCloseLoadingIndicator();
            // console.log('User Added!')
            handleClickSnackbar()
            handleSnackbarSeverity("success")
            handleSnackbarMessage(`Successfuly deleted Scholarship officer!`)
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
            setScholarshipOfficerProfile([])
        }
    }, [useUserUid])

    const onClickDeleteButton = (event, rowData) => {
        deleteScholarshipOfficer(rowData.user_uid)
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
                            DELETE COLLEGE OFFICER
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Divider className={classes.divider}  variant="middle" />
                        </Grid>
                    </Grid>
                    <MaterialTable
                        title="Officers"
                        columns={[
                            { title: 'Last Name', field: 'user_first_name' },
                            { title: 'First Name', field: 'user_last_name' },
                            { title: 'Contact Number', field: 'user_contact_number' },
                        ]}
                        data={useScholarshipOfficerProfile}        
                        actions={[
                            {
                            icon: 'close',
                            tooltip: 'Delete',
                              onClick: onClickDeleteButton
                            },
                        ]}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default CollegeOfficerBlock
