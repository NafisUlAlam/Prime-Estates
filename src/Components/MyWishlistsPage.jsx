import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";
import TitleAndSubTitle from "./TitleAndSubTitle";
import MyWishlistCard from "./MyWishlistCard";
import Swal from "sweetalert2";

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

  const deleteWishlistMutation = useMutation({
    mutationFn: async (id) => {
      console.log("wish id", id);
      await axiosSecure.delete(`/wishlists/user/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Done!",
        text: "Successfully deleted the wishlist item!",
        icon: "success",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: `${error.message}`,
        text: "Could not delete from the wishlist!",
        icon: "error",
      });
    },
  });

  const handleDelete = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });
    if (result.isConfirmed) {
      deleteWishlistMutation.mutate(id);
    }
  };

  if (isWishlistsLoading) return <PageLoading></PageLoading>;
  console.log(wishlists);
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Wishlist"}
        subtitle={`Discover the properties you've set your heart on. Your wishlist is where dreams take shape—carefully curated homes and spaces that align with your preferences. Whether you're envisioning your next investment or your forever home, this page keeps track of your favorites for easy access. Browse, review, and take the next step toward making these properties yours. Start exploring now!`}
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
            ></MyWishlistCard>
          ))
        ) : (
          <div className="text-center">
            <Nothing title={`You Don't Have Any Wishlist 😥`}></Nothing>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlistsPage;
