import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";
import { FaLocationPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MyPropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const {
    _id: offerId,
    offerAmount,
    propertyDetails,
    sellerDetails,
    status,
    transactionId,
  } = property;
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
            ${offerAmount}
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
          {status && (
            <p
              className={`badge badge-outline ${
                status === "pending"
                  ? "text-yellow-500"
                  : `${
                      status === "accepted" || status === "bought"
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
          <h2 className=" font-bold md:text-xl">{propertyDetails.title}</h2>
          <div className="flex gap-2 items-center">
            <FaLocationPin className="text-red-500 " size={16}></FaLocationPin>
            <p className="font-light opacity-70">{propertyDetails.location}</p>
          </div>
        </div>
        <p className="px-4">{propertyDetails.description.slice(0, 80)}...</p>
        <div className="card-actions px-4 pb-8 justify-center mt-4">
          {status === "accepted" && (
            <button
              className="btn btn-primary"
              onClick={() => navigate(`payment/${offerId}`)}
            >
              Pay Now!
            </button>
          )}
          {status === "bought" && (
            <p className="text-sm badge badge-outline">
              transaction ID:
              <span className="text-sm font-bold">
                #pi...{transactionId.slice(-6)}
              </span>
            </p>
          )}
        </div>
      </div>
    </Slide>
  );
};

MyPropertyCard.propTypes = {
  property: PropTypes.object,
};
export default MyPropertyCard;
