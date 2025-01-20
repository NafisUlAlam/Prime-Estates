import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdvertiseProperties = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: verifiedProperties = [],
    isLoading: isVerifiedPropertiesLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedproperties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/verifiedproperties");
      return data;
    },
  });

  //admin is setting advertise key of a property

  const advertiseMutation = useMutation({
    mutationFn: async ({ id, advertise }) => {
      //console.log(info);
      await axiosSecure.patch(`/propertyadvertise/${id}`, advertise);
    },
  });

  if (isVerifiedPropertiesLoading) return <PageLoading></PageLoading>;
  console.log(verifiedProperties);

  const handleAdvertiseProperty = async (id) => {
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
      const advertise = { advertise: "advertise" };
      advertiseMutation.mutate(
        { id, advertise },
        {
          onSuccess: () => {
            toast.success("Successfully Advertised!");
            refetch();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };
  return (
    <>
      <TitleAndSubTitle
        title={"Advertise Properties Seamlessly"}
        subtitle={
          "Highlight selected properties to attract more buyers and ensure top-notch visibility in the marketplace."
        }
      ></TitleAndSubTitle>
      {verifiedProperties.length > 0 && (
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
                <th>Advertised</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {verifiedProperties.map((property) => (
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
                      <img
                        src={property?.sellerPhotoURL}
                        className="w-12 h-12 object-cover rounded-full"
                        alt=""
                      />
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
                        property.advertise === "advertise"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {property.advertise ? "Advertised" : "Not Advertised"}
                    </h2>
                  </td>
                  {!property.advertise && (
                    <td>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAdvertiseProperty(property._id)}
                          className="btn bg-green-200 btn-sm"
                          disabled={advertiseMutation.isPending}
                        >
                          {advertiseMutation.isPending
                            ? "Processing..."
                            : "Advertise"}
                        </button>
                      </div>
                    </td>
                  )}
                  {property.advertise && (
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

      {verifiedProperties.length === 0 && (
        <Nothing title={"No property available 😴"}></Nothing>
      )}
    </>
  );
};

export default AdvertiseProperties;
