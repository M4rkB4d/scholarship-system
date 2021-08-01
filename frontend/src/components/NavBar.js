import React, { useState } from 'react'
// Material UI Raect Component
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// React Router Dom
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
// Pages
import About from '../Pages/About';
import Announcement from '../Pages/Announcement';
import Contact from '../Pages/Contact';
import Login from '../Pages/Login';
import StudentRegistration from '../Pages/StudentRegistration';
// Custom Components
import TabBarInitial from './TabBarInitial';
import LoginButton from './LoginButton';
import useLoginSession from '../Pages/Hooks/use-loginSession';
import LogoutButton from './LogoutButton';
import StudentProfile from '../Pages/StudentProfile';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    tabBar: {
        // marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
    },
    title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  }));

const NavBar = () => {
    const classes = useStyles();
    const { useUserSignedIn, useUserType } = useLoginSession();
    // console.log(useUserType)
    // useLoginSession()
    // console.log(useUserSignedIn, useUserType)

    const isLoggedIn = (isLoggedIn) => {
      return isLoggedIn ? <LogoutButton />: <LoginButton/>;
    }

    return (
        <Router>
            <div className={classes.root}>
              <AppBar position="static">
                  <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <SchoolIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                      Dashboard
                  </Typography>
                  <Grid container justifyContent="center">
                      <TabBarInitial useUserType={useUserType}/>
                  </Grid>
                  { isLoggedIn(useUserSignedIn) }
                  {/* <LoginButton/>
                  <LogoutButton/> */}
                  </Toolbar>
              </AppBar>
            </div>
            <div>
              <Switch>
                <Route exact path="/">
                    {/* <Announcement/> */}
                </Route>
                <Route path="/announcement">
                    {/* <Announcement/> */}
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/contact">
                    <Contact/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <StudentRegistration/>
                </Route>
                <Route path="/profile">
                    <StudentProfile/>
                </Route>
              </Switch>
            </div>
        </Router>
    )
}

export default NavBar
