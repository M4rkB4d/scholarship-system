import React from 'react'
// Material UI Raect
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// React Router Dom
import { Link } from "react-router-dom";
// Hook
import useTabIndex from '../Pages/Hooks/use-tabindex';

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
    const { useTabIndex: tabIndex, valueChangeHandler: onChangeHandler} = useTabIndex();

    console.log(tabIndex)

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
                    <Tab component={Link} to="/announcement" label="Announcement" />
                    <Tab component={Link} to="/about" label="About" />
                    <Tab component={Link} to="/contact" label="Contact" />
                    <Tab component={Link} to="/register" label="Register" />
                </Tabs>
            </Paper>  
        </div>
    )
}

export default TabBarInitial
