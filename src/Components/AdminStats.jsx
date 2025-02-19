import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PageLoading from "./PageLoading";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admindash");
      return data;
    },
  });
  if (isLoading) return <PageLoading></PageLoading>;
  console.log(data);
  return (
    <>
      {/*  total properties */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Property Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Total Properties</h3>
            <p className="text-2xl font-bold">{data.totalProperties}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Verified</h3>
            <p className="text-2xl font-bold">{data.verified}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Rejected</h3>
            <p className="text-2xl font-bold">{data.rejected}</p>
          </div>
        </div>
      </div>
      {/* <StraightAnglePieChart data={data}></StraightAnglePieChart> */}
      {/* total users */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Total Properties</h3>
            <p className="text-2xl font-bold">{data.totalUsers}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Buyers</h3>
            <p className="text-2xl font-bold">{data.buyers}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Sellers</h3>
            <p className="text-2xl font-bold">{data.sellers}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStats;
