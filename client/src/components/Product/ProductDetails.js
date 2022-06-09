import { useEffect } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component"

// components
import Loader from "../layout/Loader/Loader.js"

// actions
import { getProductDetails } from "../../Actions/ProductAction"

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { load, error, product } = useSelector(state => state.productDetails) 
    useEffect(() => {
        dispatch(getProductDetails(id))
        window.scrollTo(0,0)
    }, [dispatch, id])
    return (
        <>
        {
            load? 
            <Loader/> 
            :
            <>
        <div className="productDetails">
            <div>
            <Carousel
            width="25vmax"
            showArrows={false}
            showIndicators={false}
            thumbWidth="5vmax"
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
            >
                {
                    product.images && 
                    product.images.map( (image, i) => (
                        <img 
                        key={image._id} 
                        src={image.url} 
                        alt={`slide:${i}`} 
                        />
                    ))
                }
            </Carousel>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars/>
                    <span>( {product.numOfReviews} Reviews )</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>₹{product.price}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input type="number" value={1} />
                            <button>+</button>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status: &ensp;
                        <b className={product.stock < 1? "redColor" : "greenColor"}>
                            {product.stock < 1? "Out of Stock" : "In Stock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
                    <button className="submitReview">Submit Review</button>
                </div>
            </div>
        </div>
        </>
        }
        </>
    )
}


export default ProductDetails