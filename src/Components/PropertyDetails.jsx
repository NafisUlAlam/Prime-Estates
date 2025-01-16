import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "./PageLoading";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import MyModal from "./MyModal";
import { useState } from "react";
import Reviews from "./Reviews";

const PropertyDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function close() {
    setIsModalOpen(false);
  }
  const { user: currentUser, loading: isUserLoading } = useAuth();

  // this id is the property id
  const { id } = useParams();

  //this is to check user role
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  //get the single property data
  const { data: property = {}, isLoading: isPropertyLoading } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/property/${id}`);
      return data;
    },
  });

  //get the seller email
  const { data: seller, isLoading: isSellerLoading } = useQuery({
    queryKey: ["seller", property?.sellerEmail],
    enabled: !!property?.sellerEmail,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${property?.sellerEmail}`);
      return data;
    },
  });

  //get reviews of based on the property id
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/property/${id}`);
      return data;
    },
  });
  if (isPropertyLoading || isSellerLoading || isUserLoading || isReviewsLoading)
    return <PageLoading></PageLoading>;

  const handleAddToWishlist = async (id) => {
    //console.log(id);
    const wishlistInfo = {
      propertyId: id,
      propertyPhotoURL: property?.photoURL,
      propertyTitle: property?.title,
      propertyLocation: property?.location,
      propertyMinPrice: property?.minPrice,
      propertyMaxPrice: property?.maxPrice,

      sellerEmail: seller?.email,
      sellerName: seller?.name,
      sellerPhotoURL: seller?.photoURL,

      verificationStatus: "pending",

      buyerEmail: currentUser?.email,
      buyerName: currentUser?.displayName,
      buyerPhotoURL: currentUser?.photoURL,
    };
    const { data } = await axiosSecure.post("/wishlist", wishlistInfo);
    if (data.insertedId) {
      toast.success("Successfully Added to wishlist");
    } else {
      toast.error("Sorry! Can't Add anymore");
    }
  };
  const handleAddReview = async (id, review, rating) => {
    //console.log(id, review, rating);
    const reviewInfo = {
      reviewerPhotoURL: currentUser?.photoURL,
      reviewerName: currentUser?.displayName,
      reviewerEmail: currentUser?.email,
      rating,
      reviewDescription: review,

      sellerEmail: seller?.email,
      sellerPhotoURL: seller?.photoURL,

      propertyId: id,
      propertyPhotoURL: property?.photoURL,
      propertyTitle: property?.title,
      timeStamp: new Date().toISOString(),
    };
    //console.log(reviewInfo);
    const { data } = await axiosSecure.post("/reviews", reviewInfo);
    if (data.insertedId) {
      toast.success("Successfully added a review");
      setIsModalOpen(false);
      refetch();
    }
  };
  //console.log(role !== "buyer");
  //console.log(property, seller, currentUser, reviews);
  return (
    <div>
      {/* // property Details */}
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
        <img
          src={property.photoURL}
          alt={property.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <div className="flex items-start gap-8 mt-8">
          <div className="flex flex-col items-center gap-2">
            <img
              src={seller.photoURL}
              className="w-16 h-16 object-cover rounded-full"
              alt=""
            />
            <p className="font-medium">{property.sellerName}</p>
          </div>
          <h1 className="lg:text-2xl font-bold text-center flex-1">
            {property.title}
          </h1>
        </div>
        <p className="text-gray-600 mt-2">{property.description}</p>
        <p className="text-lg mt-4">
          <strong>
            {" "}
            ${property.minPrice} - ${property.maxPrice}
          </strong>
        </p>

        <div className="flex gap-4">
          <button
            disabled={role !== "buyer"}
            onClick={() => handleAddToWishlist(id)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 btn"
          >
            Add to Wishlist
          </button>
          <button
            disabled={role !== "buyer"}
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 btn"
          >
            Leave a Review
          </button>
          {/* //review modal */}
          <MyModal
            close={close}
            isModalOpen={isModalOpen}
            id={id}
            handleAddReview={handleAddReview}
          ></MyModal>
        </div>
      </div>
      <Reviews reviews={reviews}></Reviews>
      {/*  // reviews section */}
    </div>
  );
};

export default PropertyDetails;
