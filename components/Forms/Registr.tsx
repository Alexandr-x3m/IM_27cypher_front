import { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { connect } from 'react-redux'

import s from '../../styles/Forms/Form.module.sass'
import { setCookie } from '../../utils/token'
import { setUserSettings } from '../../redux/actionCreators/UserSettingActions'
import { StoreType, UserSettingsType } from '../../interfaces/ReduxStates'


interface RegisterForm {
    closeWindow: Function,
    setUserSettings: UserSettingsType['setUserSettings']
}

const emailValid = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

const Register: React.FC<RegisterForm> = (props) => {

    //-------------------------------
    const [login, setLogin] = useState<string>('')
    const [errLogin, setErrLogin] = useState<boolean>(false)

    //-------------------------------
    const [pass, setPass] = useState<string>('')
    const [hiddenPass, setHiddenPass] = useState<string>('')
    const [errPass, setErrPass] = useState<boolean>(false)

    const [repeatPass, setRepeatPass] = useState<string>('')


    //-------------------------------------------------
    const [mail, setMail] = useState<string>('')
    const [errMail, setErrMail] = useState<boolean>(false)

    const [errMessage, setErrMessage] = useState<string>('')


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (pass === repeatPass) {
            setErrPass(false)
            setErrMessage('')

            let formData = new FormData()

            formData.append('login', login)
            formData.append('email', mail)
            formData.append('pass', pass)

            axios({
                method: 'post',
                url: 'http://192.168.0.51:3001/registration',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            })
                .then(res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        setCookie('UID', res.data.id)
                        setCookie('UVH', res.data.verify)
                        setCookie('ULS', res.data.login)

                        props.setUserSettings({
                            id: res.data.id,
                            login: res.data.login,
                            email: res.data.mail, 
                            role: res.data.role
                        })

                        console.log('зарегестрирован')
                        props.closeWindow(false)
                    } 
                    if (res.status === 205) {
                        setErrMessage('Пользователь с таким именем уже существует')
                    }
                })
                .catch(err => {
                    debugger
                    
                    console.log(err.message)
                })

        } else {
            setErrPass(true)
        }
    }

    /* const emailHandler = (e: InputEvent) => {
        let value = e.target.value
        let emailMatch = emailValid.test(mail)
        if (emailMatch) {
            setErrMail(false)
            setMail(value)
        } else {
            setErrMail(true)
            setMail(value)
        }
    } */

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value

        //let x = value.split('')
        //let y = x.map(el => ('*'))

        setPass(value)
        //setHiddenPass(y.join(''))
        setHiddenPass(value)
    }

    return (
        <form
            className={s.container}
            onSubmit={handleSubmit}
        >
            <h2 className={s.title} >
                Регистрация
            </h2>
            <h6>{errMessage}</h6>
            <div className={s.txtfields_container} >
                <TextField
                    value={login}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                    label='Имя пользователя'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    autoFocus={true}
                    //error={true}
                    //helperText={"Some important text"}
                />
                <TextField
                    value={mail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
                    label='Email'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    //error={errMail}
                    //helperText={"Укажите почту по примеру: example@mail.ru"}
                />
                <TextField
                    value={hiddenPass}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => passwordHandler(e)}
                    label='Пароль'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    error={errPass}
                />
                <TextField
                    value={repeatPass}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPass(e.target.value)}
                    label='Повторите пароль'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    error={errPass}
                    helperText={errPass ? "Пароли не совпадают" : null}
                />
            </div>
            <Button
                variant="contained"
                className={s.submit}
                fullWidth={true}
                type='submit'
            >
                Зарегестрироваться
            </Button>
        </form>
    )
}

const MapStateToProps = (state: StoreType) => ({
    store: state.userSettingsReducer
})

const MapDispatchToProps = {
    setUserSettings
}

export default connect(MapStateToProps, MapDispatchToProps)(Register)