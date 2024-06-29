import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({
  rating,
  starRatedColor = "gold",
  numberOfStar = 5,
  starDimension = "20px",
  starSpacing = "2px",
}) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor={starRatedColor}
      numberOfStar={numberOfStar}
      starDimension={starDimension}
      starSpacing={starSpacing}
    />
  );
};

export default StarRating;
