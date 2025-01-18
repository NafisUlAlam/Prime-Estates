import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import TitleAndSubTitle from "./TitleAndSubTitle";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";

import Swal from "sweetalert2";
import ReviewCard from "./ReviewCard";

const ManageReviewsPage = () => {
  const axiosSecure = useAxiosSecure();

  //getting all the reviews for admin to manage
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews`);
      return data;
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/admin/${id}`);
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
  //console.log(reviews);
  return (
    <div>
      <TitleAndSubTitle
        title={"Monitor and Manage Feedbacks"}
        subtitle={`Gain insights into user feedback with a comprehensive view of all property reviews. Manage interactions effectively, ensuring transparency and maintaining trust in your platform.`}
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
            <ReviewCard
              key={review._id}
              review={review}
              handleDelete={handleDelete}
            ></ReviewCard>
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

export default ManageReviewsPage;
