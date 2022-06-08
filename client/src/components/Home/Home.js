import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import MetaData from "../layout/MetaData.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Actions
import { getProducts } from "../../Actions/ProductAction"

//components
import Product from "./Product.js"
import Loader from "../layout/Loader/Loader.js"


const Home = () => {
    const dispatch = useDispatch()
    const { load, products, productsCount, error } = useSelector(state => state.ProductReducer)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])  
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])
    return (
        <>
            <ToastContainer
                theme="dark"
                autoClose={2000}
            />
            {
                load ?
                    <Loader />
                    :
                    <>
                        <MetaData title="D-COMMERCE || Best ready made garments shop || Best prices || World class qualities" />
                        <div className="banner">
                            <p>Welcome to D-Commerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>
                            <a href="#container">
                                <button>
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h1 className="homeHeading">Featured Products</h1>
                        <div className="container" id="container">

                            {
                                products && products.map(product => <Product key={product._id} product={product} />)
                            }

                        </div>
                    </>
            }
        </>
    )
}


export default Home