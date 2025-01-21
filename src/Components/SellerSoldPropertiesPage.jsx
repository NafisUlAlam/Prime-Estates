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

  const { data: soldAmount = {}, isLoading: isSoldAmountLoading } = useQuery({
    queryKey: ["totalamount", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/totalsoldamount/seller/${user?.email}`
      );
      return data[0];
    },
  });

  if (isSoldPropertiesLoading || isSoldAmountLoading)
    return <PageLoading></PageLoading>;
  //console.log(soldProperties);
  //console.log(soldAmount);
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Sold Properties"}
        subtitle={
          "Celebrate your successful deals with a dedicated overview of your sold properties. This page highlights the properties you've closed, along with essential details to track your achievements."
        }
      ></TitleAndSubTitle>
      <div className="text-center lg:text-2xl my-8">
        <h2>
          Your total sales:{" "}
          <span className="font-bold text-purple-400">
            ${soldAmount?.totalAmount ? soldAmount?.totalAmount : "0"}
          </span>
        </h2>
      </div>
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
