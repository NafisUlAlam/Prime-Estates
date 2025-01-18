import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLoading from "./PageLoading";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //we are giving the current user email here becausue we wanna get all the other users except the logged in user
      const { data } = await axiosSecure.get(
        `/users?email=${currentUser?.email}`
      );
      //console.log(data);
      return data;
    },
  });

  const markFraudPropertyMutation = useMutation({
    mutationFn: async ({ id, info }) => {
      console.log(id, info);
      await axiosSecure.patch(`/reject-properties/${id}`, info);
    },
  });
  //console.log(users);
  if (isLoading) return <PageLoading></PageLoading>;

  //making a buyer or seller admin
  const handleMakeAdmin = (id) => {
    //console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/change/${id}`, {
            role: "admin",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully changed role into admin",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    });
  };

  // making a buyer into seller
  const handleMakeSeller = (id) => {
    //console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/change/${id}`, {
            role: "seller",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully changed role into seller",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    });
  };
  const handleMarkFraud = async (id) => {
    console.log(id);
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
      try {
        const { data } = await axiosSecure.patch(`/markfraud/${id}`, {
          fraud: "fraud",
        });
        //console.log(data);
        // to do : properties need to be rejected here based on the seller id
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Done!",
            text: "Successfully marked as Fraud!",
            icon: "success",
          });
          //after marking this seller id with fraud, we need to reject all his properties
          const info = { status: "rejected" };
          markFraudPropertyMutation.mutate({ id, info });
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleDeleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            //console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully deleted the user",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* User Photo */}
              <td>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.photoURL} alt={user.name} />
                  </div>
                </div>
              </td>
              {/* User Name */}
              <td>{user.name}</td>
              {/* User Email */}
              <td>{user.email}</td>
              {/* Actions */}
              <td>{user.role}</td>
              <td>
                <div className="flex gap-2 items-center">
                  {/* Make Admin Button */}
                  {user.role !== "admin" && user.fraud !== "fraud" && (
                    <button
                      className="btn btn-primary btn-sm w-auto"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Make Agent Button */}
                  {user.role === "buyer" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleMakeSeller(user._id)}
                    >
                      Make Seller
                    </button>
                  )}

                  {/* Mark as Fraud Button (only for agents) */}
                  {user.role === "seller" && user.fraud !== "fraud" && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleMarkFraud(user._id)}
                    >
                      Mark as Fraud
                    </button>
                  )}
                  {user.role === "seller" && user.fraud === "fraud" && (
                    <span className="badge badge-error">fraud</span>
                  )}

                  {/* Delete User Button */}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
