import { useEffect, useState } from "react"
import axios from 'axios'
import { connect } from 'react-redux'

import { getCookie, deleteOneCookie } from '../utils/token'
import { clearActiveUser, setUserSettings } from '../redux/actionCreators/UserSettingActions'
import Loader from '../components/Loader/Loader'
import { StoreType, UserSettingsType } from '../interfaces/ReduxStates'


const Authenticate: React.FC<{ clearActiveUser: UserSettingsType['clearActiveUser'], setUserSettings: UserSettingsType['setUserSettings'] }> = (props) => {

    const [loader, setLoader] = useState<boolean>(true)

    useEffect(() => {
        debugger
        let login = getCookie('ULS')
        let id = getCookie('UID')
        let verify = getCookie('UVH')

        let formData = new FormData()

        formData.append('login', login)
        formData.append('id', id)
        formData.append('verify', verify)

        if (login !== '' && id !== '' && verify !== '') {

            axios({
                method: 'post',
                url: 'http://localhost:3001/checkUser',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData
            })
                .then(res => {
                    debugger
                    setLoader(false)
                    if (res.status === 200) {
                        props.setUserSettings({
                            id: res.data.id,
                            login: res.data.login,
                            email: res.data.email,
                            role: res.data.role
                        })
                    }
                    if (res.status === 204) {
                        debugger
                        props.clearActiveUser()
                        deleteOneCookie('ULS')
                        deleteOneCookie('UID')
                        deleteOneCookie('UVH')
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else {
            props.clearActiveUser()
            deleteOneCookie('ULS')
            deleteOneCookie('UID')
            deleteOneCookie('UVH')
            deleteOneCookie('UPH')
            setLoader(false)
        }
    }, [loader])

    return (
        <>
            <div>
                {loader
                    ? (<Loader />)
                    : props.children
                }
            </div>

        </>
    )
}

/* const MapStateToProps = (state: StoreType) => ({
    store: state.userSettingsReducer
}) */

const MapDispatchToProps = {
    clearActiveUser,
    setUserSettings
}

export default connect(null, MapDispatchToProps)(Authenticate)