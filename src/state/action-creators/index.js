export const setUri=(val)=>{
    return (dispatch)=>{
        dispatch({
            type:'setUri',
            payload:val
        })
    }
} 
export const setAccessToken=(val)=>{
    return (dispatch)=>{
        dispatch({
            type:"setAccessToken",
            payload:val
        })
    }
} 