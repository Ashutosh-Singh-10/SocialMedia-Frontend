import { useEffect } from "react";
import { useState } from "react"


const useDebounce = (value, delay) => {
    const [debouncedValue, SetDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            console.log('fetching')
            SetDebouncedValue(value);

        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])
    return debouncedValue;
}

export default useDebounce