import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const SellerSoldPropertiesTable = ({ soldProperties }) => {
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

              <th>Selling Price</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {soldProperties.map((offer, index) => (
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
                  <h2 className={"text-green-500"}>{offer.status}</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fade>
  );
};

export default SellerSoldPropertiesTable;
SellerSoldPropertiesTable.propTypes = {
  soldProperties: PropTypes.array,
};
