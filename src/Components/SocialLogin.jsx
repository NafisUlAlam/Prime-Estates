import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { setLoading, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    setLoading(true);
    googleSignIn()
      .then((res) => {
        //console.log(res.user);
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          //console.log(res.data);
          if (res.data.insertedId) {
            toast.success("You have signed up successfully.", {
              position: "top-center",
            });
          }
        });
        navigate(location?.state ? location.state : "/", { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err.message
            .split("/")[1]
            .slice(0, err.message.split("/")[1].length - 2),
          {
            position: "top-center",
          }
        );
      });
  };
  return (
    <div className="text-center">
      <button className="btn  w-max py-4 btn-accent" onClick={handleClick}>
        <FaGoogle></FaGoogle>Sign In With Google
      </button>
    </div>
  );
};

export default SocialLogin;
