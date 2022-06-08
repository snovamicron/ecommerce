import  { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import MetaData from "../layout/MetaData.js"

// Actions
import { getProducts } from "../../Actions/ProductAction"

//components
import Product from "./Product.js"

const product = {
    name:"Blue T-shirt",
    images:[{ url: "https://bit.ly/3NXDHrh"}],
    price: "$200",
    _id: "/boom"
}

const Home = ()=>{
    const dispatch = useDispatch()
    const { load, products, productsCount, error } = useSelector(state => state.ProductReducer)
    useEffect(() => {
        dispatch(getProducts())
    },[dispatch])
    return (
        <>
        <MetaData title="D-COMMERCE || Best ready made garments shop || Best prices || World class qualities"/>
        <div className="banner">
            <p>Welcome to D-Commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h1 className="homeHeading">Featured Products</h1>
        <div className="container" id="container">
            
            {
                products && products.map( product => <Product product={product}/>)
            }

        </div>
        </>
    )
}


export default Home