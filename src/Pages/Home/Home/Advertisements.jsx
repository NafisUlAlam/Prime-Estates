import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PageLoading from "../../../Components/PageLoading";
import TitleAndSubTitle from "./../../../Components/TitleAndSubTitle";
import { Link } from "react-router-dom";
import Nothing from "../../../Components/Nothing";
import { CiLocationOn } from "react-icons/ci";

const Advertisements = () => {
  const axiosPublic = useAxiosPublic();
  const { data: advertisements = [], isLoading: isAdvertisementsLoading } =
    useQuery({
      queryKey: ["advertisements"],
      queryFn: async () => {
        const { data } = await axiosPublic.get("/home/advertisements");
        return data;
      },
    });

  if (isAdvertisementsLoading) return <PageLoading></PageLoading>;
  //console.log(advertisements);
  return (
    <div>
      <TitleAndSubTitle
        title={"Featured Favorites"}
        subtitle={
          "Discover the Cream of the Crop: A curated selection of standout properties handpicked by our admin team. Explore top-tier listings that truly deserve the spotlight."
        }
      ></TitleAndSubTitle>
      {advertisements.length > 0 && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.map((property) => (
            <div key={property._id} className="property-card">
              <figure className="relative">
                <img
                  src={property.photoURL}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`badge bg-accent border-0 absolute top-2 left-4 ${
                    property.status === "verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {property.status}
                </span>
                <p className="font-bold absolute top-2 right-4 bg-accent text-text px-4 rounded-lg">
                  ${property.minPrice} - ${property.maxPrice}
                </p>
              </figure>
              <div className="card-body text-text">
                <h2 className="card-title lg:text-2xl">{property.title}</h2>
                <p className="text-text/50 flex gap-2 items-center lg:text-xl">
                  <CiLocationOn className="text-red-400 font-bold" />
                  {property.location}
                </p>

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
      {advertisements.length === 0 && (
        <Nothing title={"No Available Properties 😥"}></Nothing>
      )}
    </div>
  );
};

export default Advertisements;
