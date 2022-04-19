import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions'
import { useSelector } from 'react-redux';

const ProductDetails = () => {

    const product = useSelector((state) => state.product)
    // console.log('Hey', product)
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { image, title, price, category, description } = product;

    console.log('ID : ', productId)

    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch((err) => {
            console.log('Error : ', err)
        })
        // console.log('HEY YA :', response.data)
        dispatch(selectedProduct(response.data))
    }

    useEffect(() => {
        if (productId && productId !== '') fetchProductDetail()
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [productId])

    return (
        <div className="ui grid container">
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">AND</div>
                        <div className="middle aligned row">
                            <div className="column lp">
                                <img alt='text_img' style={{ width: '25rem', height: '25rem' }} className="ui fluid image" src={image} />
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">${price}</a>
                                </h2>
                                <h3 className="ui brown block header">{category}</h3>
                                <p>{description}</p>
                                <div className="ui vertical animated button" tabIndex="0">
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails