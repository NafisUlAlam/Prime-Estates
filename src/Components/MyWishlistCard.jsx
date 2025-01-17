import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";
import { FaLocationPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MyWishlistCard = ({ wishlist, handleDelete }) => {
  const navigate = useNavigate();
  const {
    _id,

    propertyDetails,
    sellerDetails,
    verificationStatus,
  } = wishlist;
  return (
    <Slide className="grid grid-rows-subgrid row-span-5">
      <div className="grid grid-rows-subgrid row-span-5  shadow-xl h-full rounded-lg">
        <figure className="relative">
          <img
            src={propertyDetails.photoURL}
            alt={propertyDetails.title}
            className="rounded-xl h-[200px] object-cover w-full"
          />
          <p
            className="absolute   h-auto w-auto right-2 top-2 bg-yellow-500 
          text-white font-bold px-4 rounded-lg"
          >
            ${propertyDetails.minPrice} - {propertyDetails.maxPrice}
          </p>
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
          <h2 className=" font-bold md:text-xl">{propertyDetails.title}</h2>
          <div className="flex gap-2 items-center">
            <FaLocationPin className="text-red-500 " size={16}></FaLocationPin>
            <p className="font-light opacity-70">{propertyDetails.location}</p>
          </div>
        </div>
        <p className="px-4">{propertyDetails.description.slice(0, 80)}...</p>
        <div className="card-actions pb-8 justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`offer/${_id}`)}
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
