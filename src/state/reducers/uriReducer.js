const reducer = (state = "/", action) => {

    if (action.type === 'setUri') {
        return action.payload
    }
    else {
        return state;
    }

}

export default reducer;
