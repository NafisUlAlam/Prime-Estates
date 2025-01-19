import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils/utils";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";
import { Fade } from "react-awesome-reveal";

const AddPropertyPage = () => {
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuth();
  const inputRef = useRef();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser = {}, isLoading: isFraudStatusLoading } = useQuery({
    queryKey: ["fraud", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data;
    },
  });
  const addPropertyMutation = useMutation({
    mutationFn: async (propertyInfo) => {
      //console.log(propertyInfo);
      const { data } = await axiosSecure.post("/properties", propertyInfo);
      return data;
    },
  });
  if (isFraudStatusLoading) return <PageLoading></PageLoading>;
  console.log(currentUser);
  const handleAddProperty = async (e) => {
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
    const status = "pending";

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
      status,
    };

    addPropertyMutation.mutate(propertyInfo, {
      onSuccess: () => {
        setIsPending(false);
        toast.success("Successfully added, please wait for admin approval");
      },
      onError: (error) => {
        setIsPending(false);
        toast.error(error.message);
      },
    });
  };
  //console.log(addPropertyMutation.isPending);

  return (
    <div className="min-h-screen ">
      {currentUser?.fraud === "fraud" ? (
        <Fade>
          <div className="flex items-center flex-col justify-center h-screen">
            <img src={"https://i.ibb.co.com/bWXXwvh/hacker.png"} alt="" />
            <h2 className="lg:text-2xl font-bold text-red-400">
              You Have Been Marked as Fraud
            </h2>
            <p>You can&apos;t add anymore property</p>
          </div>
        </Fade>
      ) : (
        <Fade>
          <div className="card  w-full shrink-0 shadow-2xl md:p-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center pt-4">
              Add Property
            </h2>
            <hr className="mt-4 text-black" />
            <form
              className="card-body grid grid-cols-1 md:grid-cols-2"
              onSubmit={(e) => handleAddProperty(e)}
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
                  ref={inputRef}
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
                  value={user?.displayName}
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
                  value={user?.email}
                  readOnly
                />
              </div>

              <button
                className="btn btn-accent  md:col-span-2 my-8"
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add Property"}
              </button>
            </form>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default AddPropertyPage;
