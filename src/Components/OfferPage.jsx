import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import useAuth from "../hooks/useAuth";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

const OfferPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: wishlists = {}, isLoading: isWishlistLoading } = useQuery({
    queryKey: ["offer", id],
    //enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlists/${id}`);
      return data;
    },
  });

  const offerPostMutation = useMutation({
    mutationFn: async (offerObject) => {
      await axiosSecure.post("/offers", offerObject);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Done!",
        text: "Successfully Made an Offer!",
        icon: "success",
      });
      navigate("/dashboard/propertybought");
    },
    onError: (error) => {
      Swal.fire({
        title: `${error.message}`,
        text: "Could not Make Offer!",
        icon: "error",
      });
    },
  });

  if (isWishlistLoading) return <PageLoading></PageLoading>;
  const wishlist = wishlists[0];
  const { _id, propertyDetails, sellerDetails } = wishlist;
  //console.log(wishlist);
  const handleMakeOffer = (e) => {
    e.preventDefault();
    const offerAmount = parseInt(e.target.offer.value);
    const buyingDate = new Date(e.target.buyingDate.value).toISOString();
    //console.log(offerAmount, buyingDate);
    if (
      offerAmount < propertyDetails.minPrice ||
      offerAmount > propertyDetails.maxPrice
    ) {
      toast.error("Sorry! The amount must be within the price range");
      return;
    }

    const offerObject = {
      propertyId: propertyDetails?._id,
      buyerEmail: user?.email,
      sellerEmail: sellerDetails?.email,
      wishListId: _id,
      offerAmount,
      buyingDate,
      status: "pending",
    };
    //console.log(offerObject);
    offerPostMutation.mutate(offerObject);
  };
  return (
    <div className="min-h-screen ">
      <div className="card  w-full shrink-0 shadow-2xl md:p-8">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center pt-4">
          Make an Offer
        </h2>
        <hr className="mt-4 text-black" />
        <form
          className="card-body grid grid-cols-1 md:grid-cols-2"
          onSubmit={(e) => handleMakeOffer(e)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Title</span>
            </label>
            <input
              value={propertyDetails.title}
              className="input input-bordered bg-blue-50"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Location</span>
            </label>
            <input
              value={propertyDetails.location}
              className="input input-bordered bg-blue-50"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              value={sellerDetails.name}
              readOnly
              className="input input-bordered bg-blue-50"
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Price range</span>
            </label>
            <div>
              <h2 className="input input-bordered bg-blue-50 flex items-center">
                ${propertyDetails.minPrice} - {propertyDetails.maxPrice}
              </h2>
            </div>
          </div>

          <div className="form-control relative ">
            <label className="label">
              <span className="label-text">Offer Amount</span>
            </label>
            <input
              placeholder="make an offer..."
              type="number"
              name="offer"
              className="textarea textarea-bordered bg-blue-50"
              required
            />
          </div>
          <div className="form-control relative ">
            <label className="label">
              <span className="label-text">Buying Date</span>
            </label>
            <input
              placeholder="select a date..."
              type="date"
              name="buyingDate"
              className="textarea textarea-bordered bg-blue-50"
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              name="user"
              className="input input-bordered bg-blue-50"
              value={user.displayName}
              readOnly
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="text"
              name="email"
              className="input input-bordered bg-blue-50"
              value={user?.email}
              readOnly
              required
            />
          </div>
          <button className="btn btn-accent md:col-span-2 my-8">Offer</button>
        </form>
      </div>
    </div>
  );
};

export default OfferPage;
