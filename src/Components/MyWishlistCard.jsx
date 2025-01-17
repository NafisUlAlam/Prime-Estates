import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";

const MyWishlistCard = ({ wishlist, handleMakeOffer, handleDelete }) => {
  const {
    _id,

    propertyDetails,
    sellerDetails,
    verificationStatus,
  } = wishlist;
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
        <div className="space-y-4 px-4 flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={sellerDetails.photoURL}
              className="size-8 rounded-full"
              alt=""
            />
            <div>
              <p className="font-semibold">{sellerDetails.name}</p>
              <p className="font-semibold opacity-60">
                @{sellerDetails.email.split("@")[0]}
              </p>
            </div>
          </div>
          {verificationStatus && (
            <p
              className={`badge badge-outline ${
                verificationStatus === "pending" ? "text-yellow-500" : ""
              } `}
            >
              {verificationStatus}
            </p>
          )}
        </div>

        <div className="space-y-4 px-4">
          <h2 className=" text-center font-bold md:text-xl">
            {propertyDetails.title}
          </h2>
          <p>{propertyDetails.description.slice(0, 80)}...</p>
        </div>

        <div className="card-actions pb-8 justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleMakeOffer(_id)}
          >
            Make Offer
          </button>
          <button className="btn btn-primary" onClick={() => handleDelete(_id)}>
            Delete
          </button>
        </div>
      </div>
    </Slide>
  );
};

MyWishlistCard.propTypes = {
  wishlist: PropTypes.object,
  handleDelete: PropTypes.func,
  handleMakeOffer: PropTypes.func,
};

export default MyWishlistCard;
