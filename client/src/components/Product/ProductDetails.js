import { useEffect } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

// actions
import { getProductDetails } from "../../Actions/ProductAction"

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { load, error, product } = useSelector(state => state.productDetails) 
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])
    return (
        <>
        <div className="productDetails">
            <div>
            <Carousel
            width={"50%"}
            useKeyboardArrows={true}
            centerMode={true}
            centerSlidePercentage={100}
            showArrows={false}
            thumbWidth={"4vmax"}
            showIndicators={false}
            swipeable={true}
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
        </div>
        </>
    )
}


export default ProductDetails