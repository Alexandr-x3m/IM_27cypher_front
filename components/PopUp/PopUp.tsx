import { ReactNode } from 'react'
import s from '../../styles/PopUp.module.sass'

interface PopUpProps {
    visability: boolean,
    setVisability: Function,
    content: ReactNode
}

const PopUp: React.FC<PopUpProps> = ({visability, setVisability, content}) => {


    return (
        <>
            {visability
                ? (<div className={s.container} >
                    <div className={s.background} onClick={() => setVisability(false)} ></div>
                    <div className={s.content} >
                        {content}
                    </div>
                </div>)
                : null
            }
        </>
    )
}

export default PopUp