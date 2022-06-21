import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from "../../Actions/ProductAction.js"
import Loader from "../layout/Loader/Loader.js"
import "./Products.css"

// components
import Product from "../Home/Product.js"

const Products = () => {
    const dispatch = useDispatch()
    const {load, products, productsCount, error}  = useSelector( state => state.products )
    useEffect(() => {
        dispatch(getProducts())
    },[dispatch])
    return (
        <>
            {
                load ? <Loader/> :
                <>
                <h2 className="productsHeading">Products</h2>
               <div className="products">
               {
                    products && 
                    products.map(product => (
                        <Product product={product} key={product.id} />
                    ))
                }
               </div>
                </>
            }
        </>
    )
}


export default Products