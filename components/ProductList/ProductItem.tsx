import Image from 'next/Image'

import s from '../../styles/ProductList/productItem.module.sass'

interface ProductItemProps {
    src: string,
    price: string,
    category: string,
    name: string
}

const ProductItem: React.FC<ProductItemProps> = (props) => {

    const { src, price, category, name } = props

    return (
        <div className={s.container} >
            <div className={s.img_block} >
                <img 
                    src={src} 
                />
            </div>
            <div className={s.text_block} >
                <p className={s.name} >
                    {name} / {category}
                </p>
                <p className={s.price} >
                    {price} ₽
                </p>
            </div>
        </div>
    )
}

export default ProductItem