import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Nothing from "./Nothing";

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

  const verifyPropertyMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/propertystatus/${id}`, status);
    },
  });

  const handleVerifyProperty = async (id) => {
    //console.log(id);
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
      const status = { status: "verified" };
      //console.log(id, status);
      verifyPropertyMutation.mutate(
        { id, status },
        {
          onSuccess: () => {
            toast.success("Verification successful!");
            refetch();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };
  const handleRejectProperty = async (id) => {
    //console.log(id);
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
      const status = { status: "rejected" };
      //console.log(id, status);
      verifyPropertyMutation.mutate(
        { id, status },
        {
          onSuccess: () => {
            toast.success("Successfully Rejected!");
            refetch();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };
  if (isLoading) return <PageLoading></PageLoading>;
  //console.log(properties);
  return (
    <>
      <TitleAndSubTitle
        title={"Manage Properties Seamlessly"}
        subtitle={
          "Effortlessly oversee all listed properties, verify details, and maintain quality standards to ensure a trusted and secure marketplace."
        }
      ></TitleAndSubTitle>
      {properties.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-zebra">
            {/* Table Header */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Agent </th>

                <th>Price Range</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="hover">
                  <td>
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={property.photoURL}
                        className="rounded-lg w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{property.title}</td>
                  <td>{property.location}</td>

                  <td>
                    <div>
                      <img src={property?.sellerphotoURL} alt="" />
                      <h2>{property.sellerName}</h2>
                      <h2>{property.sellerEmail}</h2>
                    </div>
                  </td>

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
      )}

      {properties.length === 0 && (
        <Nothing title={"No property available 😴"}></Nothing>
      )}
    </>
  );
};

export default ManageProperties;
