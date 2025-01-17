import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";
import TitleAndSubTitle from "./TitleAndSubTitle";
import MyWishlistCard from "./MyWishlistCard";

const MyWishlistsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //getting all the wishlists for the user
  const {
    data: wishlists = [],
    isLoading: isWishlistsLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlists", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlists/user/${user?.email}`);
      return data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleMakeOffer = (id) => {
    console.log(id);
  };

  if (isWishlistsLoading) return <PageLoading></PageLoading>;
  console.log(wishlists);
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Reviews, Our Recommendations"}
        subtitle={`Discover tailored suggestions for every Review you post and explore
            thoughtful recommendations from others. Empower your decisions with a
            community-driven platform designed for clarity and collaboration.`}
      ></TitleAndSubTitle>
      <div
        className={`${
          wishlists.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid grid-cols-1 place-items-center"
        }`}
      >
        {wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <MyWishlistCard
              key={wishlist._id}
              wishlist={wishlist}
              handleDelete={handleDelete}
              handleMakeOffer={handleMakeOffer}
            ></MyWishlistCard>
          ))
        ) : (
          <div className="text-center">
            <Nothing title={`You Don't Have Any Review Posted`}></Nothing>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlistsPage;
