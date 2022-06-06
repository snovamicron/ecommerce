import { CgMouse } from "react-icons/cg"
import "./Home.css"

//components
import Product from "./Product.js"

const product = {
    name:"Blue T-shirt",
    images:[{ url: "https://bit.ly/3NXDHrh"}],
    price: "$200",
    _id: "/boom"
}

const Home = ()=>{
    return (
        <>
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
            
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

        </div>
        </>
    )
}


export default Home