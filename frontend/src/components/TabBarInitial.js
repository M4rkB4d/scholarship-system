import React, { Fragment } from 'react'
// Material UI Raect
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// React Router Dom
import { Link } from "react-router-dom";
// Hook
import useTabIndex from '../Pages/Hooks/use-tabindex';
// import useLoginSession from '../Pages/Hooks/use-loginSession';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
  indicator: {
    backgroundColor: "white",
  },
  tabs: {
      color: "white"
  }
}));


const TabBarInitial = (props) => {
    const classes = useStyles(); 
    /**
     * always put `keynames` of map objects then set its `alias`
     * forgetting to do so causes undefined value fetching 
     * eg. `keyname` -> useTabIndex : `alias` -> tabIndex
     */
    // const { useUserSignedIn, useUserType } = useLoginSession()
    const { useTabIndex: tabIndex, valueChangeHandler: onChangeHandler, setTabIndex} = useTabIndex();
    const { to, useUserType } = props;

    const CustomLink = React.useMemo(
      () =>
        React.forwardRef((linkProps, ref) => (
          <Link ref={ref} to={to} {...linkProps} />
        )),
      [to],
    );

    const tabBasedOnUser = (userType) => {
      
      switch (userType) {
        case "scholarship officer":
          return [
            <Tab key={0} component={CustomLink} to="/student" label="Student" />,
            <Tab key={1} component={CustomLink} to="/scholarship" label="Scholarship" />,
            <Tab key={2} component={CustomLink} to="/search" label="Search" />,
            <Tab key={3} component={CustomLink} to="/feedback" label="Feedback" />,
          ]
        case "student":
          return [
              <Tab key={0} component={CustomLink} to="/profile" label="Profile" />,
              <Tab key={1} component={CustomLink} to="/scholarship" label="Scholarship" />,
              <Tab key={2} component={CustomLink} to="/feedback" label="Feedback" />,
          ] 
        case "admin":
          return [
              <Tab key={0} component={CustomLink} to="/college-details" label="College Details" />,
              <Tab key={1} component={CustomLink} to="/college-officers" label="College Officers" />,
              <Tab key={2} component={CustomLink} to="/block-college-officer" label="Block College Officer" />,
          ]
        case "visitor":
          return [
              <Tab key={0} component={CustomLink} to="/announcement" label="Announcement" />,
              <Tab key={1} component={CustomLink} to="/about" label="About" />,
              <Tab key={2} component={CustomLink} to="/contact" label="Contact" />,
              <Tab key={3} component={CustomLink} to="/register" label="Register" />,
          ] 
      }
    }

    return (
        <div className={classes.root}>
            <Paper elevation={0}
                square={true}
                variant="elevation"
                 className={classes.paper}>
                <Tabs
                value={tabIndex}
                onChange={onChangeHandler}
                TabIndicatorProps={{ className: classes.indicator }}
                className={classes.tabs}
                centered
                >
                  { tabBasedOnUser(useUserType) }
                </Tabs>
            </Paper>  
        </div>
    )
}

export default TabBarInitial
