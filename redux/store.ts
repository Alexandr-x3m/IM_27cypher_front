import { createStore, combineReducers  } from 'redux'
import userSettingsReducer from './reducers/UserSettings'


const store = createStore(combineReducers({
    userSettingsReducer
}))

export default store