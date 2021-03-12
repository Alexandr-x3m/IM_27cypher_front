import s from '../../styles/loader.module.sass'

const Loader: React.FC = () => {

    return (
        <div className={s.container} >
            <div className={s.loader}></div>
            <div className={s.shadow}></div>
            {/* props.children */}
        </div>
    )
}

export default Loader