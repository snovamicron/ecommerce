import profilePng from "../../images/profile.png"
import ReactStars from "react-rating-stars-component"

const ReviewCard = ({ review }) => {
    return (
        <>
        <div className="reviewCard">
            <img src={profilePng} alt="avatar" />
            <p>{review.name}</p>
            <ReactStars
            edit={false} 
            activeColor="blue"
            value={review.rating}
            isHalf={true}
            size={ window.innerWidth < 600 ? 20 : 25}
            />
            <span>{review.comment}</span>
        </div>
        </>
    )
}

export default ReviewCard