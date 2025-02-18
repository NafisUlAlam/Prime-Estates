import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import { Link } from "react-router-dom";
import { useState } from "react";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Nothing from "./Nothing";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AllProperties = () => {
  useDocumentTitle(`All Properties|PrimeEstates`);
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [allProperties, setAllProperties] = useState([]);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allproperties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allverifiedproperties");
      setAllProperties(data);
      return data;
    },
  });
  if (isLoading) return <PageLoading></PageLoading>;

  const searchByLocation = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const newArray = properties.filter((property) =>
      property.location.toLowerCase().includes(text)
    );
    //console.log(text, newArray);
    setAllProperties(newArray);
  };

  const handleSort = () => {
    const newArray = [...allProperties];
    newArray.sort((a, b) => a.minPrice - b.minPrice);
    setAllProperties(newArray);
  };
  return (
    <div>
      <TitleAndSubTitle
        title={"Verified Properties Showcase"}
        subtitle={
          "Discover a curated collection of properties verified for quality, authenticity, and trust. Explore your dream home or investment opportunity with confidence."
        }
      ></TitleAndSubTitle>
      <div className="flex justify-center items-center gap-4 my-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            value={searchText}
            type="text"
            className="grow"
            placeholder="Search by location"
            onChange={searchByLocation}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn bg-green-100" onClick={handleSort}>
          Sort By Price
        </button>
      </div>
      {allProperties.length > 0 && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProperties.map((property) => (
            <div key={property._id} className="property-card">
              <figure className="relative">
                <img
                  src={property.photoURL}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`badge absolute top-2 left-4 ${
                    property.status === "verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {property.status}
                </span>
                <p className="font-bold absolute top-2 right-4 bg-yellow-500 px-4 rounded-lg">
                  ${property.minPrice} - ${property.maxPrice}
                </p>
              </figure>
              <div className="card-body text-text">
                <h2 className="card-title ">{property.title}</h2>
                <p className="text-text/50">{property.location}</p>
                <div className="flex items-center space-x-3 my-3">
                  <img
                    src={property.sellerPhotoURL || "/placeholder-user.png"}
                    alt={property.sellerName}
                    className="w-10 h-10 rounded-full border object-cover"
                  />

                  <span className="font-semibold">{property.sellerName}</span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="primary-btn">Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {allProperties.length === 0 && (
        <Nothing title={"No Available Properties 😥"}></Nothing>
      )}
    </div>
  );
};

export default AllProperties;
