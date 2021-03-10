import { SET_ACTIVE_USER, CLEAR_ACTIVE_USER } from '../actions';

const initialState = {
    user_active: false,
    id: '',
    login: '',
    email: '',
    role: '',
}   

const userSettingsReducer = (state = initialState, action: {type: string, payload: {id: string, login: string, email: string, role: string, user_active: boolean}}) => {
    switch(action.type){
        case SET_ACTIVE_USER: 
            return {
                ...state,
                id: action.payload.id,
                login: action.payload.login,
                email: action.payload.email,
                role: action.payload.role,
                user_active: true
            }
        case CLEAR_ACTIVE_USER: 
            return {
                ...state,
                id: '',
                login: '',
                email: '',
                role: '',
                user_active: false
            }
        default: 
            return state
    }
}

export default userSettingsReducer