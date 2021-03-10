import Head from 'next/head'

import Header from '../../components/Header/Header'
import ProductContainer from '../../components/Pages/Product/Product'


export default function Product() {




    return (
        <div>
            <Head>
                <title>Название продукта</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Header />
                <ProductContainer />
            </div>
        </div>
    )
}