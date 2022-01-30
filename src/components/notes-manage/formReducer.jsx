import {isValid} from "./func";

function formReducer(state, action) {
    switch (action.type) {
        case 'reset':
            return action.payload;
        case 'change':
            action.payload.isValid = isValid(state);
            return {...state, ...action.payload};
        case 'loading':
            return {loading: action.payload.loading};
        default:
            return state
    }
}

export default formReducer;