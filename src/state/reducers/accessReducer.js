const reducer =(state="",action)=>{

    if(action.type==='setAccessToken')
    {
        return action.payload
    }
    else
    {
        return state;

    }
    
    }
    
    export default reducer;
    