import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  //const token = localStorage.getItem("access-token");
  //console.log("inside use role token :", token, "loading: ", loading);
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      //console.log(res.data.role);
      return res.data.role;
    },
  });
  return [role, isLoading];
};

export default useRole;
