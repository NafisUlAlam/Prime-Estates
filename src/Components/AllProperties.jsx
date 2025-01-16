import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import { Link } from "react-router-dom";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allproperties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allverifiedproperties");
      return data;
    },
  });
  if (isLoading) return <PageLoading></PageLoading>;
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property._id}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
        >
          <figure>
            <img
              src={property.photoURL}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <div className="flex items-center space-x-3 my-3">
              <img
                src={property.sellerPhotoURL || "/placeholder-user.png"}
                alt={property.sellerName}
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-semibold">{property.sellerName}</span>
            </div>
            <p className="font-bold">
              ${property.minPrice} - ${property.maxPrice}
            </p>
            <p>
              <span className="font-semibold">Verification Status:</span>{" "}
              <span
                className={`badge ${
                  property.status === "Verified"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {property.status}
              </span>
            </p>
            <div className="card-actions justify-end mt-4">
              <Link to={`/propertyDetails/${property._id}`}>
                <button className="btn btn-primary btn-sm">Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProperties;
