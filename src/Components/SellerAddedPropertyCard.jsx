import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";
import { FaLocationPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SellerAddedPropertyCard = ({
  property,
  sellerPhotoURL,
  handleDelete,
}) => {
  const {
    _id: propertyId,
    title,
    location,
    photoURL,
    description,
    minPrice,
    maxPrice,
    sellerName,
    sellerEmail,
    status,
  } = property;

  const navigate = useNavigate();
  return (
    <Slide className="grid grid-rows-subgrid row-span-5">
      <div className="grid grid-rows-subgrid row-span-5  shadow-xl h-full rounded-lg">
        <figure className="relative">
          <img
            src={photoURL}
            alt={title}
            className="rounded-xl h-[200px] object-cover w-full"
          />
          <p
            className="absolute   h-auto w-auto right-2 top-2 bg-yellow-500 
              text-white font-bold px-4 rounded-lg"
          >
            ${minPrice} - {maxPrice}
          </p>
        </figure>
        <div className="space-y-4 px-4 flex justify-between">
          <div className="flex items-center gap-2">
            <img src={sellerPhotoURL} className="size-8 rounded-full" alt="" />
            <div>
              <p className="font-semibold">{sellerName}</p>
              <p className="font-semibold opacity-60">
                @{sellerEmail.split("@")[0]}
              </p>
            </div>
          </div>
          {status && (
            <p
              className={`badge badge-outline ${
                status === "pending"
                  ? "text-yellow-500"
                  : `${
                      status === "verified" || status === "bought"
                        ? "text-green-500"
                        : "text-red-500"
                    }`
              } `}
            >
              {status}
            </p>
          )}
        </div>

        <div className="space-y-4 px-4">
          <h2 className=" font-bold md:text-xl">{title}</h2>
          <div className="flex gap-2 items-center">
            <FaLocationPin className="text-red-500 " size={16}></FaLocationPin>
            <p className="font-light opacity-70">{location}</p>
          </div>
        </div>
        <p className="px-4">{description.slice(0, 80)}...</p>
        <div className="card-actions px-4 pb-8 justify-center mt-4">
          {status !== "rejected" && (
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(`/dashboard/updateproperty/${propertyId}`)
              }
            >
              Update
            </button>
          )}

          <button
            className="btn btn-primary"
            onClick={() => handleDelete(propertyId)}
          >
            Delete
          </button>
        </div>
      </div>
    </Slide>
  );
};

export default SellerAddedPropertyCard;
SellerAddedPropertyCard.propTypes = {
  property: PropTypes.object,
  sellerPhotoURL: PropTypes.string,
  handleDelete: PropTypes.func,
};
