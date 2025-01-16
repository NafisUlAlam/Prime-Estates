import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/propertiesforadmin");
      return data;
    },
  });

  const handleVerifyProperty = async (id) => {
    console.log(id);
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });
    if (res.isConfirmed) {
      try {
        const { data } = await axiosSecure.patch(`/propertystatus/${id}`, {
          status: "verified",
        });
        //console.log(data);
        // to do : properties need to be rejected here based on the seller id
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Done!",
            text: "Successfully Verified the property",
            icon: "success",
          });
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleRejectProperty = async (id) => {
    console.log(id);
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });
    if (res.isConfirmed) {
      try {
        const { data } = await axiosSecure.patch(`/propertystatus/${id}`, {
          status: "rejected",
        });
        //console.log(data);
        // to do : properties need to be rejected here based on the seller id
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Done!",
            text: "Successfully Rejected the property",
            icon: "success",
          });
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  if (isLoading) return <PageLoading></PageLoading>;
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full table-zebra">
        {/* Table Header */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Location</th>
            <th>Agent Name</th>
            <th>Agent Email</th>
            <th>Price Range</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {properties.map((property, index) => (
            <tr key={property._id} className="hover">
              <td>{index + 1}</td>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.sellerName}</td>
              <td>{property.sellerEmail}</td>
              <td>
                ${property.minPrice} - ${property.maxPrice}
              </td>
              <td>
                <h2
                  className={`${
                    property.status === "pending"
                      ? "text-yellow-500"
                      : `${
                          property.status === "verified"
                            ? "text-green-500"
                            : "text-red-500"
                        }`
                  }`}
                >
                  {property.status}
                </h2>
              </td>
              {property.status === "pending" && (
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleVerifyProperty(property._id)}
                      className="btn btn-success btn-sm"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleRejectProperty(property._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}
              {property.status !== "pending" && (
                <td>
                  <span>No action to perform</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
