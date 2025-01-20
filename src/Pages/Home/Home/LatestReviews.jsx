import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import PageLoading from "./../../../Components/PageLoading";

import HomePageReviewCard from "./HomePageReviewCard";
const LatestReviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
    queryKey: ["latestreviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/home/reviews");
      return data;
    },
  });

  if (isReviewsLoading) return <PageLoading></PageLoading>;
  console.log(reviews);
  return (
    <section className="py-6 lg:py-12 bg-[#f4f4f4] mt-12 bg-banner4 bg-no-repeat bg-center bg-cover">
      <div className="text-center space-y-4 w-11/12 mx-auto mb-6 lg:mb-12 lg:mt-12 text-white">
        <h1 className=" text-xl font-bold md:text-2xl lg:text-4xl text-center my-8 ">
          Our Satisfied Customers
        </h1>
        <p className=" text-xl font-thin text-center my-8">
          Prime Estates has served over 15,000 customers with excellent
          performance and guaranteed client satisfaction. Have a look what our
          customers have to say about us.
        </p>
      </div>
      <div className="grid grid-cols1 md:grid-cols2 lg:grid-cols-3">
        {reviews.map((review) => (
          <HomePageReviewCard
            key={review._id}
            review={review}
          ></HomePageReviewCard>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
