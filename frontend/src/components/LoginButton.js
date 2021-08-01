import React from 'react'
// Material React Component
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
// import Fade from '@material-ui/core/Fade';
import useOpenModal from '../Pages/Hooks/use-openModal';
import Login from '../Pages/Login';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    modal: {
        margin: theme.spacing(8),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    control: {
        padding: theme.spacing(2),
    },
    form: {
    '& > *': {
        margin: theme.spacing(2.9),
        width: '45ch',
        // justifyContent: 'center',
    },
        width: "50ch"
    }
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

const LoginButton = (props) => {
    const classes = useStyles();
    const { useOpenModal: isModalOpen, 
            openChangeHandler: openModalChangeHandler, 
            closeChangeHandler: closeModalChangeHandler,
            openModal,
            closeModal } = useOpenModal()

    const CustomModal = React.forwardRef((props, ref) => (
        <Modal ref={ref} >
          {props.children}
        </Modal>
    ));

    return (
        <div>
            <Button 
            color="inherit" 
            onClick={openModalChangeHandler}>Login</Button>
            <Modal
                className={classes.modal}
                open={isModalOpen}
                onClose={closeModalChangeHandler}
                closeAfterTransition
                BackdropProps={{
                timeout: 500,
                }}
                component={CustomModal}
            >
                <Fade in={isModalOpen}>
                    <Login 
                      onClick={closeModalChangeHandler} 
                      openModal={openModal}
                      closeModal={closeModal}
                    />
                </Fade>
            </Modal>   
        </div>
    )
}

export default LoginButton
