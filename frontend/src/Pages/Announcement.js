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
import Carousel from 'react-material-ui-carousel'

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
    carousel: {
        height: theme.spacing(70),
        width: '180ch'
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

const Announcement = () => {
    // CSS Style
    const classes = useStyles();

    var items = [
      {
          name: "Announcement #1",
          description: "announcement description",
          imageURL: "https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831_960_720.png"
      },
      {
          name: "Announcement #2",
          description: "announcement description",
          imageURL: "https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_960_720.jpg"
      },
      {
          name: "Announcement #3",
          description: "announcement description",
          imageURL: "https://media.istockphoto.com/photos/maths-picture-id1305511217?s=612x612"
      },
      {
          name: "Announcement #4",
          description: "announcement description",
          imageURL: "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_960_720.jpg"
      }
  ]

  return (
        <Box pt={3} className={classes.box}>
            <Paper>
                <Box m={5}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography align="center" className={classes.typography} variant="h4" color='textPrimary'>
                                ANNOUNCEMENTS
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
                            <Carousel >
                                { items.map( (item, i) => <Item key={i} item={item} /> ) }
                            </Carousel>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>    
        </Box>
    )
}

function Item(props)
{
    // CSS Style
    const classes = useStyles();
    
    return (
        <Paper className={classes.carousel}>
            <Grid container >
                <Grid item xs={12}>
                    <Typography align="center" className={classes.typography} variant="h5" color='textPrimary'>
                        {props.item.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <Typography align="center" className={classes.typography} variant="h6" color='textPrimary'>
                        {props.item.description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <img
                        width="100%"
                        height="500px"
                        src={props.item.imageURL}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullscreen
                    />
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default Announcement
