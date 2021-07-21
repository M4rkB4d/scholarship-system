import { useState } from "react"

const useOpenModal = () => {
    const [useOpenModal, setOpenModal] = useState(false);

    const openChangeHandler = () => {

        setOpenModal(true);
    }

    const closeChangeHandler = () => {

        setOpenModal(false);
    }

    return { useOpenModal, openChangeHandler, closeChangeHandler }
}

export default useOpenModal;