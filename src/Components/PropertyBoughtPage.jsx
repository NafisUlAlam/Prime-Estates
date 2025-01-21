import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";
import TitleAndSubTitle from "./TitleAndSubTitle";
import MyPropertyCard from "./MyPropertyCard";

const PropertyBoughtPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading: isPropertiesLoading } = useQuery({
    queryKey: ["propertybought", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offers/user/${user?.email}`);
      return data;
    },
  });

  if (isPropertiesLoading) return <PageLoading></PageLoading>;
  //console.log(properties);
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Offers"}
        subtitle={`Track the properties you’ve bid on and stay updated on your offers. Review your bid history, monitor competition, and seize the opportunity to own your desired property.`}
      ></TitleAndSubTitle>
      <div
        className={`${
          properties.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid grid-cols-1 place-items-center"
        }`}
      >
        {properties.length > 0 ? (
          properties.map((property) => (
            <MyPropertyCard
              key={property._id}
              property={property}
            ></MyPropertyCard>
          ))
        ) : (
          <div className="text-center">
            <Nothing title={`You Don't Have Any Property Bought 😥`}></Nothing>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyBoughtPage;
