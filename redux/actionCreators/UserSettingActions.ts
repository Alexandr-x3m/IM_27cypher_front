import * as types from '../actions'

export const setUserSettings = (data: {id: string, login: string, email: string, role: string}) => ({
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