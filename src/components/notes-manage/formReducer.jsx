import {isValid} from "./func";

function formReducer(state, action) {
    switch (action.type) {
        case 'reset':
            return {...state, ...action.payload};
        case 'change':
            return {
                ...state,
                ...action.payload,
                isValid: isValid({...state, ...action.payload})
            };
        case 'loading':
            return {...state, loading: action.payload.loading};
        default:
            return state
    }
}

export default formReducer;