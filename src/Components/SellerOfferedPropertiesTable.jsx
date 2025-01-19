import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const SellerOfferedPropertiesTable = ({
  offers,
  handleAcceptOffer,
  handleRejectOffer,
}) => {
  return (
    <Fade>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Property Details</th>
              <th>Location</th>
              <th>Buyer Details</th>

              <th>Price Offered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {offers.map((offer, index) => (
              <tr key={offer._id} className="hover">
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col gap-2 ">
                    <img
                      src={offer?.propertyDetails?.photoURL}
                      className="w-12 h-12 rounded-full object-cover"
                      alt=""
                    />
                    <h2>{offer?.propertyDetails?.title}</h2>
                  </div>
                </td>
                <td>{offer?.propertyDetails?.location}</td>
                <td>
                  <div className="flex flex-col gap-2 ">
                    <img
                      src={offer?.buyerDetails.photoURL}
                      className="w-12 h-12 rounded-full object-cover"
                      alt=""
                    />
                    <h2>{offer?.buyerDetails.name}</h2>
                    <h2>{offer?.buyerDetails.email}</h2>
                  </div>
                </td>
                <td>${offer.offerAmount}</td>
                <td>
                  <h2
                    className={`${
                      offer?.status === "pending"
                        ? "text-yellow-500"
                        : `${
                            offer.status === "accepted"
                              ? "text-green-500"
                              : "text-red-500"
                          }`
                    }`}
                  >
                    {offer.status}
                  </h2>
                </td>
                {offer.status === "pending" && (
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAcceptOffer(offer._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectOffer(offer._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
                {offer.status !== "pending" && (
                  <td>
                    <div className="flex items-center space-x-2">
                      <h2>No actions available</h2>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fade>
  );
};

export default SellerOfferedPropertiesTable;
SellerOfferedPropertiesTable.propTypes = {
  offers: PropTypes.array,
  handleAcceptOffer: PropTypes.func,
  handleRejectOffer: PropTypes.func,
};
