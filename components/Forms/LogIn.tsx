import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { setCookie } from '../../utils/token'


import { TextField, Button } from '@material-ui/core'

import s from '../../styles/Forms/Form.module.sass'
import { setUserSettings } from '../../redux/actionCreators/UserSettingActions'


interface LogInProps {
    setUserSettings: Function,
    closeWindow: Function
}

const LogIn: React.FC<LogInProps> = (props) => {

    const [login, setLogin] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Отправлено')

        let formData = new FormData()

        formData.append('login', login)
        formData.append('pass', pass)

        axios({
            method: 'post',
            url: 'http://192.168.0.51:3001/auth',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
            
        })
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    debugger
                    setCookie('ULS', login)
                    setCookie('UVH', res.data.verify)
                    setCookie('UID', res.data.id)

                    props.setUserSettings({
                        id: res.data.id,
                        login: res.data.login,
                        email: res.data.email,
                        role: res.data.role,
                    })
                    props.closeWindow(false)
                } else {
                    console.log('пароль не верный')
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    return (
        <form
            className={s.container} 
            onSubmit={handleSubmit}
        >
            <h2 className={s.title} >
                Войти
            </h2>
            <div className={s.txtfields_container} >
                <TextField
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    id="user_name"
                    label='Имя пользователя'
                    classes={{root: s.textfield_label}}
                    required={true}
                />
                <TextField
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    id="user_pass"
                    label='Пароль'
                    classes={{root: s.textfield_label}}
                    required={true}
                />
                </div>
            <Button 
                variant="contained" 
                className={s.submit} 
                fullWidth={true} 
                type='submit'
            >
                Войти
            </Button>
        </form>
    )
}

const MapStateToProps = (state) => ({
    store: state.userSettingsReducer
}); 

const MapDispatchToProps = { setUserSettings }

export default connect(MapStateToProps, MapDispatchToProps)(LogIn)
