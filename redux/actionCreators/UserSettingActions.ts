import * as types from '../actions'
import { UserSettingsType } from '../../interfaces/ReduxStates'

export const setUserSettings: UserSettingsType['setUserSettings'] = (data) => ({
    type: types.SET_ACTIVE_USER,
    payload: {
        id: data.id,
        login: data.login,
        email: data.email,
        role: data.role,
    }
})  

export const clearActiveUser = () => ({
    type: types.CLEAR_ACTIVE_USER
})