import { SET_ACTIVE_USER, CLEAR_ACTIVE_USER } from '../actions';
import { UserSettingsType } from '../../interfaces/ReduxStates'


const initialState: UserSettingsType['initState'] = {
    user_active: false,
    id: '',
    login: '',
    email: '',
    role: '',
}   

const userSettingsReducer = (state = initialState, action: any): UserSettingsType['initState'] => {
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