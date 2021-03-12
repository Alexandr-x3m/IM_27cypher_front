
interface StoreType {
    userSettingsReducer: UserSettingsType['initState']
}

interface UserSettingsType {
    initState: {
        user_active: boolean,
        id: string,
        login: string,
        email: string,
        role: string,
    },
    actionSetUserSet: {
        type: string,
        payload: UserSettingsType['payloadSetUserSet']
    },
    payloadSetUserSet: {
        id: string,
        login: string,
        email: string,
        role: string
    },
    setUserSettings: (data: UserSettingsType['payloadSetUserSet']) => UserSettingsType['actionSetUserSet'],
    clearActiveUser: Function
}

export type {
    StoreType,
    UserSettingsType,
    
}