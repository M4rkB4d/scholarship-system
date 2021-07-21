import { useEffect, useState } from "react";

const useTabIndex = () => {
    const [useTabIndex, setTabIndex] = useState(0)

    /**
     * 
     * @param {*event} event 
     * @param {*newValue} newValue 
     */
    const valueChangeHandler = (event, newValue) => {

        setTabIndex(newValue)
    }

    return { useTabIndex, valueChangeHandler }
}

export default useTabIndex;