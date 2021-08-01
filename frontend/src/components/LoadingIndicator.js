import React, { forwardRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { Backdrop, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    }));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
        if (open && onEnter) {
            onEnter();
        }
        },
        onRest: () => {
        if (!open && onExited) {
            onExited();
        }
        },
    });
    
    return (
        <animated.div ref={ref} style={style} {...other}>
        {children}
        </animated.div>
    );
    });

    Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    };

const LoadingIndicator = (props) => {
    const classes = useStyles();
    const open = props.open

    const CustomCircularProgress = React.forwardRef((props, ref) => (
        <CircularProgress ref={ref}>
            {props.children}
        </CircularProgress>
    ));

    const CustomModal = React.forwardRef((props, ref) => (
        <Modal ref={ref} >
          {props.children}
        </Modal>
    ));

    return (
        <div>
            <Modal 
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropProps={{
                timeout: 500,
                }}
                component={CustomModal}
            >
                <Fade in={open}>
                    <CircularProgress 
                        color="primary"
                        component={CustomCircularProgress}  
                    />
                </Fade>
            </Modal>
            {/* <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop> */}
        </div>
    )
}

export default LoadingIndicator
