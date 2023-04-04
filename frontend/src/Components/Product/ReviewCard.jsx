import React from "react";
import ReactStars from "react-rating-stars-component";
import Profile from "../../Images/Profile.png";
function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#e4815d",
    value: review && review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={Profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
