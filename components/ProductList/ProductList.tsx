import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/Link'

import s from '../../styles/ProductList/ProductslIst.module.sass'
import NavBar from './Navbar'
import ProductItem from './ProductItem'

interface ProductList {
  products: {
    id: string,
    name: string,
    price: string,
    description: string,
    category: { name: string },
    manufacture: { name: string }
  }[]
}


let ALL_PRODUCTS = `query {
  products {
    id
    description
    name
    price
    manufacture {
      name
    }
    category {
      name
    }
  }
  categories {
    name
    id
  }
}
`

const ProductList: React.FC = () => {

  const [categoryID, setCategoryID] = useState<string>('')
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<ProductList['products']>([{ id: '', name: '', price: '', description: '', category: { name: '' }, manufacture: { name: '' } }])


  const getAllProducts = async () => {
    return await axios({
      method: 'post',
      url: 'https://awesome-web-shop.hasura.app/v1/graphql',
      headers: { 'x-hasura-admin-secret': 'kitesurfing' },
      data: { query: ALL_PRODUCTS }
    })
      .then(res => {
        if (res.status === 200) {
          let prodData = res.data.data.products
          let catData = res.data.data.categories
          
          setProducts(prodData)
          setCategories(catData)
        }
      })
      .catch(err => console.log(err.message))
  }

  const getProductsByCategory = async () => {
    await axios({
      method: 'post',
      url: 'https://awesome-web-shop.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': 'kitesurfing'
      },
      data: {
        query: `
          query {
            products(where: {
              category_id: {_eq: "${categoryID}"}
            }) {
              id
              description
              name
              price
              manufacture {
                name
              }
              category {
                name
              }
            }
          }
      `}
    })
      .then(res => {
        if (res.status === 200) {
          let prodData = res.data.data.products

          setProducts(prodData)
        }
      })
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    if (categoryID !== '') {
      getProductsByCategory()
    } else {
      getAllProducts()
    }
  }, [categoryID])

  return (
    <div className={s.container_page} >
      <div className={s.content_page} >
        <h1 className={s.bread_crumbs_page}>
          Все товары
        </h1>
        <div className={s.navbar_container} >
          <NavBar
            store={{user_active: false, id: '1', login: '2', email: '3', role: '4'}}
            categories={categories}
            search={search}
            setSearch={setSearch}
            categoryID={categoryID}
            setCategoryID={setCategoryID}
          />
        </div>
        <div className={s.main_container_page} >
          {products.length !== 0
            ? (products.map(el => (
              <Link href={`/product/${el.id}`} key={'product_item_' + el.id} ><a>
                <ProductItem
                  src={'/placeholder.jpg'}
                  price={el.price}
                  category={el.category.name}
                  name={el.name}
                />
              </a></Link>
            )))
            : <p className={s.info}>Товаров в данной категории нет.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductList