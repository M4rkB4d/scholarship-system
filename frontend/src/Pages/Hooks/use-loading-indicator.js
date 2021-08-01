import { useState } from "react";

const useLoadingIndicator = () => {
    const [useLoadingIndicator, setLoadingIndicator] = useState(false)

    const handleOpen = () => {

        setLoadingIndicator(true)
    }

    const handleClose = () => {

        setLoadingIndicator(false)
    }

    return { useLoadingIndicator, handleOpen, handleClose }
}

export default (useLoadingIndicator);