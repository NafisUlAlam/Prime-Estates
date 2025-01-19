import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import SellerOfferedPropertiesTable from "./SellerOfferedPropertiesTable";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import TitleAndSubTitle from "./TitleAndSubTitle";
import Nothing from "./Nothing";

// only properties with offers "pending" or "rejected" or "accepted" are here
const SellerOfferedPropertiesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: offers = [],
    isLoading: isOffersLoading,
    refetch,
  } = useQuery({
    queryKey: ["offers", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offers/seller/${user?.email}`);
      return data;
    },
  });
  const offerPatchMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      //console.log(id, status);
      await axiosSecure.patch(`/offers/seller/${id}`, status);
    },

    onError: (error) => {
      toast.error(error.message);
      refetch();
    },
  });
  if (isOffersLoading) return <PageLoading></PageLoading>;
  //console.log(offers);

  const handleAcceptOffer = async (id) => {
    //console.log(id);
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });

    if (res.isConfirmed) {
      const status = { status: "accepted" };
      offerPatchMutation.mutate(
        { id, status },
        {
          onSuccess: () => {
            toast.success("Offer Accepted Successfully!");
            refetch();
          },
        }
      );
    }
  };
  const handleRejectOffer = async (id) => {
    //console.log(id);
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });

    if (res.isConfirmed) {
      const status = { status: "rejected" };
      offerPatchMutation.mutate(
        { id, status },
        {
          onSuccess: () => {
            toast.success("Offer Rejected Successfully!");
            refetch();
          },
        }
      );
    }
  };
  return (
    <div>
      <TitleAndSubTitle
        title={"Offers on Your Listings"}
        subtitle={`Stay updated with the latest offers from potential buyers interested in your properties. Review, compare, and negotiate bids to secure the best deals. `}
      ></TitleAndSubTitle>
      {offers.length > 0 ? (
        <SellerOfferedPropertiesTable
          offers={offers}
          handleAcceptOffer={handleAcceptOffer}
          handleRejectOffer={handleRejectOffer}
        ></SellerOfferedPropertiesTable>
      ) : (
        <Nothing></Nothing>
      )}
    </div>
  );
};

export default SellerOfferedPropertiesPage;
