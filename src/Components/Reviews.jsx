import PropTypes from "prop-types";
import { Fade, Slide } from "react-awesome-reveal";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Nothing from "./Nothing";
import Rating from "./Rating";

// propertyId: "6787f43d5797788f0510d1ff";
// rating: 1;
// reviewDescription: "this is not a good place. Not recommended";
// reviewerEmail: "asepasekeuase@gmail.com";
// reviewerName: "ajk lmn";
// sellerEmail: "seller1@gmail.com";
// _id: "67891daa4155f3179f9e9d79";

const Reviews = ({ reviews }) => {
  return (
    <div className="my-6">
      <Fade>
        <TitleAndSubTitle
          title={`Reviews for this Property`}
          subtitle={`Explore personalized reviews for the property inquired about. Get insights from the community and discover the best options to make an informed choice.`}
        ></TitleAndSubTitle>
      </Fade>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <Slide key={review._id} direction="right" delay={100 * (index + 1)}>
              <li className="bg-primary/20 p-4 rounded-lg shadow ">
                <div className="flex items-center space-x-4">
                  <div className="w-[20%] ">
                    <div className="flex flex-col items-center">
                      <img
                        src={review.reviewerPhotoURL}
                        alt={review.reviewerName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <p className="font-medium ">{review.reviewerName}</p>
                    </div>
                  </div>

                  <div className="w-[70%]">
                    <div className="flex justify-center flex-col items-center ">
                      <p className="mb-4">{review.reviewDescription}</p>
                      <Rating value={review.rating} readOnly />
                    </div>
                  </div>
                </div>
              </li>
            </Slide>
          ))}
        </ul>
      ) : (
        <Nothing title={`No Reviews For This Property Yet`}></Nothing>
      )}
    </div>
  );
};

export default Reviews;
Reviews.propTypes = {
  reviews: PropTypes.array,
};
