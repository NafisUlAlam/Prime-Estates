import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SellerSoldPropertiesTable from "./SellerSoldPropertiesTable";
import PageLoading from "./PageLoading";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Nothing from "./Nothing";

//only offers with "sold" status are here
const SellerSoldPropertiesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: soldProperties = [], isLoading: isSoldPropertiesLoading } =
    useQuery({
      queryKey: ["soldproperties", user?.email],
      enabled: !!user.email,
      queryFn: async () => {
        const { data } = await axiosSecure.get(
          `/soldproperties/seller/${user?.email}`
        );
        return data;
      },
    });

  if (isSoldPropertiesLoading) return <PageLoading></PageLoading>;
  //console.log(soldProperties);
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Sold Properties"}
        subtitle={
          "Celebrate your successful deals with a dedicated overview of your sold properties. This page highlights the properties you've closed, along with essential details to track your achievements."
        }
      ></TitleAndSubTitle>
      {soldProperties.length > 0 ? (
        <SellerSoldPropertiesTable
          soldProperties={soldProperties}
        ></SellerSoldPropertiesTable>
      ) : (
        <Nothing title={"You Haven't Sold Any Properties Yet 😥"}></Nothing>
      )}
    </div>
  );
};

export default SellerSoldPropertiesPage;
