
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"


const Product = ({ product }) => {
    return (
        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url} alt="product"/>
            <p>{product.name}</p>
            <div>
                <ReactStars
                edit={false}
                activeColor="blue"
                size={ window.innerWidth < 600 ? 20 : 25}
                value={3.7}
                isHalf={true}
                /> <span>(500 Reviews)</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}


export default Product