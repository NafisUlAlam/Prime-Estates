import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageLoading from "./PageLoading";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import TitleAndSubTitle from "./TitleAndSubTitle";

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

  const makeAdminMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/change/${id}`, role);
    },
  });

  const makeSellerMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/change/${id}`, role);
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: async ({ id, fraud }) => {
      await axiosSecure.patch(`/markfraud/${id}`, fraud);
    },
  });

  const markFraudPropertyMutation = useMutation({
    mutationFn: async ({ id, info }) => {
      //console.log(id, info);
      await axiosSecure.patch(`/reject-properties/${id}`, info);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async ({ id }) => {
      //console.log(id);
      await axiosSecure.delete(`/users/${id}`);
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
        const role = { role: "admin" };
        makeAdminMutation.mutate(
          { id, role },
          {
            onSuccess: () => {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully changed role into admin",
                icon: "success",
              });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
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
        const role = { role: "seller" };
        makeSellerMutation.mutate(
          { id, role },
          {
            onSuccess: () => {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully changed role into seller",
                icon: "success",
              });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    });
  };
  const handleMarkFraud = async (id) => {
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
      const fraud = { fraud: "fraud" };
      markFraudMutation.mutate(
        { id, fraud },
        {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Done!",
              text: "Successfully marked as Fraud!",
              icon: "success",
            });
            const info = { status: "rejected" };
            markFraudPropertyMutation.mutate({ id, info });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
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
        deleteUserMutation.mutate(
          { id },
          {
            onSuccess: () => {
              refetch();
              Swal.fire({
                title: "Done!",
                text: "Successfully deleted the user",
                icon: "success",
              });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    });
  };

  return (
    <>
      <TitleAndSubTitle
        title={"User Management Hub"}
        subtitle={
          "Oversee, update, and manage user roles and activity to maintain a secure and well-regulated platform experience."
        }
      ></TitleAndSubTitle>
      <div className="overflow-x-auto p-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>

              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {/* User Photo */}
                <td>
                  <div className=" flex flex-col gap-2">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt={user.name}
                    />

                    <h2 className="text-sm opacity-70">{user.email}</h2>
                  </div>
                </td>
                <td>
                  <h2>{user.name}</h2>
                </td>
                <td>
                  {" "}
                  <h2>{user.role}</h2>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    {/* Make Admin Button */}
                    {user.role !== "admin" && user.fraud !== "fraud" && (
                      <button
                        className="btn btn-primary "
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={
                          makeAdminMutation.isPending &&
                          makeAdminMutation.variables.id === user._id
                        }
                      >
                        {makeAdminMutation.isPending &&
                        makeAdminMutation.variables.id === user._id
                          ? "Wait..."
                          : "Make Admin"}
                      </button>
                    )}

                    {/* Make Agent Button */}
                    {user.role === "buyer" && (
                      <button
                        className="btn btn-success "
                        onClick={() => handleMakeSeller(user._id)}
                        disabled={
                          makeSellerMutation.isPending &&
                          makeSellerMutation.variables.id === user._id
                        }
                      >
                        {makeSellerMutation.isPending &&
                        makeSellerMutation.variables.id === user._id
                          ? "Wait..."
                          : "Make Seller"}
                      </button>
                    )}

                    {/* Mark as Fraud Button (only for agents) */}
                    {user.role === "seller" && user.fraud !== "fraud" && (
                      <button
                        className="btn btn-error "
                        onClick={() => handleMarkFraud(user._id)}
                        disabled={
                          markFraudMutation.isPending &&
                          markFraudMutation.variables.id === user._id
                        }
                      >
                        {markFraudMutation.isPending &&
                        markFraudMutation.variables.id === user._id
                          ? "Wait..."
                          : "Mark As Fraud"}
                      </button>
                    )}
                    {user.role === "seller" && user.fraud === "fraud" && (
                      <span className="badge badge-error">fraud</span>
                    )}

                    {/* Delete User Button */}
                    <button
                      className="btn bg-red-200  text-red-500 "
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={
                        deleteUserMutation.isPending &&
                        deleteUserMutation.variables.id === user._id
                      }
                    >
                      {deleteUserMutation.isPending &&
                      deleteUserMutation.variables.id === user._id
                        ? "Wait..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
