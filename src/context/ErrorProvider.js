import { useRef } from "react";
import { createContext, useState } from "react";
const ErrorContext = createContext({});
export const ErrorProvider = ({ children }) => {
    const [errMsg, setErrMsg] = useState("");
    const errRef = useRef();
    return (
        <ErrorContext.Provider value={{ errMsg, setErrMsg, errRef }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContext;