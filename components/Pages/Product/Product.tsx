import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Button } from '@material-ui/core'

import s from '../../../styles/pages/Product.module.sass'


const ProductContainer: React.FC = () => {

    const [data, setData] = useState<{name: string, description: string, price: string}>()
    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        if (!data) {
            axios({
                method: 'post',
                url: 'https://awesome-web-shop.hasura.app/v1/graphql',
                headers: {
                    'x-hasura-admin-secret': 'kitesurfing',
                },
                data: {
                    query: `
                        query MyQuery {
                            products(
                                where: {id: 
                                    {_eq: "${id}"}
                                }
                            ) {
                            description
                            manufac_id
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
                    `
                }
            })
                .then(res => {
                    debugger
                    let data = res.data.data.products[0]
                    setData(data)
                })
                .catch(err => console.log(err.message))
        }
    }, [data])

    return (
        <div className={s.container_page} >
            <div className={s.content_page} >
                <h1 className={s.bread_crumbs_page}>
                    Продукт / Номер такой то 
                </h1>
                <div className={s.main_container} >
                    <div className={s.slider_container} >
                        {/* <Slider 

                    /> */}
                    </div>
                    <div className={s.textInfo_container} >
                        <h1 className={s.name} >
                            {data ? data.name : null}
                        </h1>
                        <p className={s.description} >
                            {data ? data.description : null}
                        </p>
                        <div className={s.hor_block} >
                            <p className={s.price} >
                                {data ? (data.price + ' ₽') : null}
                            </p>
                            <div>
                                <Button
                                    value={'Добавить в избранное'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export const getStaticProps = async () => {

     

    let res = await axios({
        method: 'post',
        url: 'https://awesome-web-shop.hasura.app/v1/graphql',
        headers: {
            'x-hasura-admin-secret': 'kitesurfing',
        },
        data: {
            query: `
                query MyQuery {
                    products(
                        where: {id: 
                            {_eq: "9386f622-efde-4c93-ac9e-b39c93052436"}
                        }
                    ) {
                    description
                    manufac_id
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
            `
        }
    })

    debugger
    let data = res.data.data

    return {
        props: {
            data
        }
    }
}

export default ProductContainer