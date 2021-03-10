import { useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import { Button } from '@material-ui/core'

import s from '../../styles/header.module.sass'
import PopUp from '../PopUp/PopUp'
import LogIn from '../Forms/LogIn'
import Registr from '../Forms/Registr'
import { clearActiveUser } from '../../redux/actionCreators/UserSettingActions'
import { deleteOneCookie } from '../../utils/token'


interface HeaderProps {
    clearActiveUser: Function,
    store: any
}

const Header: React.FC<HeaderProps> = (props) => {
    console.log(props)
    const [popUp, setPopUp] = useState<boolean>(false)
    const [typeForm, setTypeForm] = useState<boolean>(false)

    const openLogInHandler = () => {
        setPopUp(true)
        setTypeForm(true)
    }

    const openRegistrHandler = () => {
        setPopUp(true)
        setTypeForm(false)
    }

    const LogOutHandler = () => {
        console.log('Вы вышли из аккаунта')
        deleteOneCookie('ULS')
        deleteOneCookie('UID')
        deleteOneCookie('UVH')
        props.clearActiveUser()
    }

    return (
        <div className={s.container} >
            <div className={s.content} >
                <Link href={'/'} ><a>
                    <img className={s.logo} src={'/logotype.svg'} />
                </a></Link>
                {!props.store.user_active
                    ? (<div className={s.authorization} >
                        <Button className={s.btn_entr} onClick={openLogInHandler} >
                            Войти
                        </Button>
                        <Button className={s.btn_reg} variant="outlined" onClick={openRegistrHandler}  >
                            Регистрация
                        </Button>
                    </div>)
                    : (<div className={s.authorization} >
                        <Button className={s.btn_reg} variant="outlined" onClick={LogOutHandler}  >
                            Выйти
                        </Button>
                    </div>)
                }
            </div>
            {popUp
                ? (<PopUp
                    visability={popUp}
                    setVisability={setPopUp}
                    content={typeForm ? <LogIn closeWindow={setPopUp} /> : <Registr closeWindow={setPopUp} />}
                />)
                : null
            }
        </div>
    )
}

const MapStateToProps = state => ({
    store: state.userSettingsReducer
})

const MapDispatchToProps = {
    clearActiveUser
}



export default connect(MapStateToProps, MapDispatchToProps)(Header)
