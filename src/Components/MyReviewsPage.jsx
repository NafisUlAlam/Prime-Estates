import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import TitleAndSubTitle from "./TitleAndSubTitle";
import PageLoading from "./PageLoading";
import MyReviewCard from "./MyReviewCard";
import Nothing from "./Nothing";
import Swal from "sweetalert2";

const MyReviewsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //getting all the reviews for the user
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return data;
    },
  });

  //console.log(reviews);
  //deleting a review based on id
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Done!",
        text: "Successfully deleted the review",
        icon: "success",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: `${error.message}`,
        text: "Could not delete the review",
        icon: "error",
      });
    },
  });

  const handleDelete = async (id) => {
    //console.log(id);
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
      deleteReviewMutation.mutate(id);
    }
  };

  if (isReviewsLoading) return <PageLoading></PageLoading>;
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
          reviews.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid grid-cols-1 place-items-center"
        }`}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <MyReviewCard
              key={review._id}
              review={review}
              handleDelete={handleDelete}
            ></MyReviewCard>
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

export default MyReviewsPage;
