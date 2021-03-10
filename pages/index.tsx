import Head from 'next/head'

import Header from '../components/Header/Header'
import ProductList from '../components/ProductList/ProductList'

export default function Home() {


  return (
    <div>
      <Head>
        <title>Магазин 27 CYPHER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <ProductList />
      </div>

    </div>

  )
}
