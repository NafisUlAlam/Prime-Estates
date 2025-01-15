import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/users/${user?.email}`);
      return data.data;
    },
    enabled: !loading && !!user,
  });
  if (isLoading) <PageLoading></PageLoading>;
  return (
    <div className=" bg-base-100 ">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-200 shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center p-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={currentUser.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
              <p className="text-base-content">{currentUser.email}</p>
              {currentUser.role && currentUser.role !== "buyer" && (
                <span className="badge badge-accent mt-2">
                  {currentUser.role}
                </span>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-base-content mb-4">
              About {currentUser.name}
            </h2>
            <p className="text-base-content">
              Welcome to your profile! Here, you can find all the essential
              details about yourself. If you wish to update your information,
              contact the admin or use the available settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
