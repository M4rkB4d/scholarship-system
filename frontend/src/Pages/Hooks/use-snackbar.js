import { useState } from "react"

const useSnackbar = () => {
    const [useOpenSnackbar, setUseOpenSnackbar] = useState(false);
    const [useSnackbarSeverity, setUseSnackbarSeverity] = useState("success");
    const [useSnackbarMessage, setUseSnackbarMessage] = useState("");

    const handleSnackbarSeverity = (type) => {
        setUseSnackbarSeverity(type);
    }
    const handleClickSnackbar = () => {
        setUseOpenSnackbar(true);
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setUseOpenSnackbar(false);
    }
    const handleSnackbarMessage = (message) => {
        setUseSnackbarMessage(message)
    }

    return {useOpenSnackbar, 
            useSnackbarSeverity, 
            useSnackbarMessage, 
            handleSnackbarSeverity, 
            handleClickSnackbar, 
            handleCloseSnackbar, 
            handleSnackbarMessage}
}

export default (useSnackbar);