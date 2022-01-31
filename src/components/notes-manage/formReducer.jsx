import {isValid} from "./func";

function formReducer(state, action) {
    switch (action.type) {
        case 'reset':
            return {...state, ...action.payload};
        case 'change':
            const nextState = { ...state, ...action.payload}
            return {...nextState, isValid: isValid(nextState)}
        case 'loading':
            return {...state, loading: action.payload.loading};
        default:
            return state
    }
}

export default formReducer;