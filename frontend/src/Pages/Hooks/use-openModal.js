import { useState } from "react"

const useOpenModal = () => {
    const [useOpenModal, setOpenModal] = useState(false);

    const openChangeHandler = () => {

        setOpenModal(true);
    }
    const closeChangeHandler = () => {

        setOpenModal(false);
    }
    const openModal = () => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }

    return { useOpenModal, openChangeHandler, closeChangeHandler, openModal, closeModal };
}

export default (useOpenModal);