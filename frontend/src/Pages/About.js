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
      marginTop: theme.spacing(2),
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }));

const About = () => {
    // CSS Style
    const classes = useStyles();

    return (
        <Box pt={3} className={classes.box}>
            <Paper>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography align="center" className={classes.typography} variant="h4" color='textPrimary'>
                            ABOUT
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
                        <Box m={1} p={4}>
                            <Typography align="left" className={classes.typography} variant="h5" color='textPrimary'>
                                What is Lorem Ipsum?
                            </Typography>
                            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Box>
                        <Box m={1} p={4}>
                            <Typography align="left" className={classes.typography} variant="h5" color='textPrimary'>
                                Why do we use it?
                            </Typography>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Box>
                        <Box m={1} p={4}>
                            <Typography align="left" className={classes.typography} variant="h5" color='textPrimary'>
                                Where does it come from?
                            </Typography>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default About
