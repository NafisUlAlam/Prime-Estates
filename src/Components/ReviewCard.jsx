import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";
import Rating from "./Rating";

const ReviewCard = ({ review, handleDelete }) => {
  const {
    _id,
    reviewerDetails,
    reviewDescription,
    timeStamp,
    propertyDetails,
    rating,
  } = review;
  let publishedAgo = 0;
  if (timeStamp) publishedAgo = formatDistance(new Date(), timeStamp);
  return (
    <Slide className="grid grid-rows-subgrid row-span-4">
      <div className="grid grid-rows-subgrid row-span-4  shadow-xl h-full">
        <figure className=" ">
          <img
            src={propertyDetails.photoURL}
            alt={propertyDetails.title}
            className="rounded-xl h-[200px] object-cover w-full"
          />
        </figure>
        <div className="space-y-4 px-4">
          <div className="flex items-center gap-2">
            <img
              src={reviewerDetails.photoURL}
              className="size-8 rounded-full"
              alt=""
            />
            <div>
              <p className="font-semibold">{reviewerDetails.name}</p>
              <p className="font-semibold opacity-60">
                @{reviewerDetails.email.split("@")[0]}
              </p>
            </div>
            <div className="flex-1 text-right opacity-60">
              <p className=" rounded-full">{publishedAgo} ago</p>
            </div>
          </div>
          <h2 className=" text-center font-bold md:text-xl">
            {propertyDetails.title}
          </h2>

          <p className="my-4">{reviewDescription.slice(0, 50)}...</p>
        </div>
        <div className="flex items-center justify-center">
          <Rating value={rating}></Rating>
        </div>

        <div className="card-actions pb-8 justify-center mt-6">
          <button
            className="btn bg-red-200 text-red-500"
            onClick={() => handleDelete(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </Slide>
  );
};

export default ReviewCard;
ReviewCard.propTypes = {
  review: PropTypes.object,
  handleDelete: PropTypes.func,
};
