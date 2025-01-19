import PropTypes from "prop-types";

const SellerOfferedPropertiesTable = ({
  offers,
  handleAcceptOffer,
  handleRejectOffer,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        {/* Table Header */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Location</th>
            <th>Buyer Name</th>
            <th>Buyer Email</th>
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
              <td>{offer?.propertyDetails?.title}</td>
              <td>{offer?.propertyDetails?.location}</td>
              <td>{offer?.buyerDetails.name}</td>
              <td>{offer?.buyerDetails.email}</td>
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
  );
};

export default SellerOfferedPropertiesTable;
SellerOfferedPropertiesTable.propTypes = {
  offers: PropTypes.array,
  handleAcceptOffer: PropTypes.func,
  handleRejectOffer: PropTypes.func,
};
