import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";

import { useState } from "react";
import { imageUpload } from "../utils/utils";
import { toast } from "react-toastify";

const UpdatePropertyPage = () => {
  const [isPending, setIsPending] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  //getting a property based on its id
  const {
    data: property = {},
    isLoading: isPropertyLoading,
    refetch,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`sellerproperty/${id}`);
      return data;
    },
  });

  const updatePropertyMutation = useMutation({
    mutationFn: async (propertyInfo) => {
      await axiosSecure.patch(`/sellerupdate/${id}`, propertyInfo);
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully updated the property details!");
      setIsPending(false);
    },
    onError: (error) => {
      refetch();
      toast.error(error.message);
      setIsPending(false);
    },
  });

  if (isPropertyLoading) return <PageLoading></PageLoading>;
  console.log(property);
  const {
    title,
    location,
    photoURL,
    description,
    minPrice,
    maxPrice,
    sellerName,
    sellerEmail,
  } = property;

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const title = e.target.title.value;
    const location = e.target.location.value;
    const photo = e.target.photo.files[0];
    const description = e.target.description.value;
    const minPrice = parseInt(e.target.minPrice.value);
    const maxPrice = parseInt(e.target.maxPrice.value);
    const sellerName = e.target.sellerName.value;
    const sellerEmail = e.target.sellerEmail.value;

    const photoURL = await imageUpload(photo);

    if (minPrice > maxPrice) {
      toast.error("Minimum price must be smaller than maximum price");
      return;
    }
    const propertyInfo = {
      title,
      location,
      photoURL,
      description,
      minPrice,
      maxPrice,
      sellerName,
      sellerEmail,
    };
    console.log(propertyInfo);
    updatePropertyMutation.mutate(propertyInfo);
  };
  return (
    <div className="min-h-screen ">
      <div className="card  w-full shrink-0 shadow-2xl md:p-8">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center pt-4">
          Update Property
        </h2>
        <hr className="mt-4 text-black" />
        <form
          className="card-body grid grid-cols-1 md:grid-cols-2"
          onSubmit={(e) => handleUpdateProperty(e)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Title</span>
            </label>
            <input
              type="text"
              placeholder="Property Title..."
              name="title"
              className="input input-bordered bg-blue-50"
              required
              defaultValue={title}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Location</span>
            </label>
            <input
              type="text"
              placeholder="Property Location..."
              name="location"
              className="input input-bordered bg-blue-50"
              defaultValue={location}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              name="photo"
              accept="image/*"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Previous Image</span>
            </label>
            <img src={photoURL} className="h-12 rounded-lg" alt="" />
          </div>

          <div className="form-control relative md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Give a short description of the property..."
              type="text"
              name="description"
              className="textarea textarea-bordered bg-blue-50 p-4"
              rows={10}
              required
              defaultValue={description}
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Minimum Price $</span>
            </label>
            <input
              placeholder="Ask for minimum price"
              type="number"
              name="minPrice"
              className="input input-bordered bg-blue-50"
              required
              defaultValue={minPrice}
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Maximum Price $</span>
            </label>
            <input
              placeholder="Not greater than 999,999$..."
              type="number"
              name="maxPrice"
              className="input input-bordered bg-blue-50"
              required
              defaultValue={maxPrice}
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              name="sellerName"
              className="input input-bordered bg-blue-50"
              value={sellerName}
              readOnly
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="text"
              name="sellerEmail"
              className="input input-bordered bg-blue-50"
              value={sellerEmail}
              readOnly
            />
          </div>

          <button
            className="btn btn-accent  md:col-span-2 my-8"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyPage;
