
function formReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {...state, ...action.payload};
        default:
            return state
    }
}

export default formReducer;