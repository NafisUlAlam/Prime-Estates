import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import Rating from "./../../../Components/Rating";

const HomePageReviewCard = ({ review }) => {
  let ago = 0;
  if (review.timeStamp) ago = formatDistance(new Date(), review.timeStamp);
  //flex flex-col items-center justify-center
  return (
    <div className=" space-y-4 grid row-span-6 grid-rows-subgrid text-center p-4  lg:space-y-0 bg-transparent lg:gap-4 max-w-2xl min-h-[500px] mr-8 text-text">
      <div className="avatar flex justify-center">
        <div className="w-24 h-24 object-cover rounded-full">
          <img src={review.reviewerPhotoURL} alt={review.reviewerName} />
        </div>
      </div>
      <p className="font-light text-sm ">{review.reviewerName}</p>
      <h1 className="text-lg font-bold">{review.propertyTitle}</h1>
      <p className="text-sm font-medium ">{review.reviewDescription}</p>
      <div className="grid place-content-center">
        <Rating value={review.rating}></Rating>
      </div>
      <p className="font-light text-sm">{ago} ago</p>
    </div>
  );
};

export default HomePageReviewCard;
HomePageReviewCard.propTypes = {
  review: PropTypes.object,
};
