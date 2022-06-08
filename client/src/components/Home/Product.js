
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"


const Product = ({ product }) => {
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="product"/>
            <p>{product.name}</p>
            <div>
                <ReactStars
                edit={false}
                activeColor="blue"
                size={ window.innerWidth <= 600 ? 17 : 25}
                value={product.ratings}
                isHalf={true}
                /> <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>₹ {product.price}</span>
        </Link>
    )
}


export default Product