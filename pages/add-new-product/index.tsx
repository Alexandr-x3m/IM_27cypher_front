import Head from 'next/head'

import s from '../../styles/pages/pageStyle.module.sass'
import Header from '../../components/Header/Header'
import AddProduct from '../../components/Forms/AddProduct'


export default function Product() {




    return (
        <div>
            <Head>
                <title>Название продукта</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Header />
                <div className={s.container} >
                    <div className={s.content}>
                        <h1 className={s.bread_crumbs}>
                            Все товары
                        </h1>
                        <div className={s.main_container} >
                            <AddProduct />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}