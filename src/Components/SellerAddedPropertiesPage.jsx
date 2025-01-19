import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import Nothing from "./Nothing";
import TitleAndSubTitle from "./TitleAndSubTitle";
import SellerAddedPropertyCard from "./SellerAddedPropertyCard";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SellerAddedPropertiesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //fetching all the properties of a seller based on his email id
  const {
    data: properties = [],
    isLoading: isPropertiesLoading,
    refetch,
  } = useQuery({
    queryKey: ["propertiesaddedbyseller", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/sellerproperties/${user?.email}`
      );
      return data;
    },
  });

  //delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/sellerdelete/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully deleted the property!");
    },
    onError: (error) => {
      refetch();
      toast.error(error.message);
    },
  });

  if (isPropertiesLoading) return <PageLoading></PageLoading>;
  //console.log(properties);

  const handleDelete = async (propertyId) => {
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
      deletePropertyMutation.mutate(propertyId);
    }
  };
  return (
    <div>
      <TitleAndSubTitle
        title={"Your Listed Properties"}
        subtitle={`Explore the properties you've added to our platform, showcasing your offerings to potential buyers and renters. Manage your listings effortlessly—track their status, update details, or remove them as needed.`}
      ></TitleAndSubTitle>
      <div
        className={`${
          properties.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid grid-cols-1 place-items-center"
        }`}
      >
        {properties.length > 0 ? (
          properties.map((property) => (
            <SellerAddedPropertyCard
              key={property._id}
              property={property}
              sellerPhotoURL={user.photoURL}
              handleDelete={handleDelete}
            ></SellerAddedPropertyCard>
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

export default SellerAddedPropertiesPage;
