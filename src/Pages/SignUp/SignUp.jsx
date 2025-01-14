import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaEye, FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { imageUpload } from "../../utils/utils";

const SignUp = () => {
  const { signUp, updateUserProfile, googleSignIn, setLoading } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  //console.log(location);
  useDocumentTitle(`Register|Suggestify`);
  //console.log(location);
  //on render complete, focus on name field
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleEye = () => setOpen((prev) => !prev);
  //form submission
  const handleSubmit = async (e) => {
    //prevent default behavior
    e.preventDefault();
    setRegistering(true);
    setError("");
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.files[0];
    console.log(email, password, name, photo);
    if (password.length < 6) {
      setError("password must be atleast 6 characters long!");
      toast.error("password must be atleast 6 characters long!");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("password must have atleast one lowercase letter!");
      toast.error("password must have atleast one lowercase letter!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("password must have atleast one upperrcase letter!");
      toast.error("password must have atleast one upperrcase letter!");
      setLoading(false);
      return;
    }

    const photoURL = await imageUpload(photo);
    console.log(photoURL);
    signUp(email, password)
      .then(() => {
        setRegistering(false);
        setLoading(false);
        navigate(location?.state ? location.state : "/", { replace: true });

        toast.success("You have signed up successfully.", {
          position: "top-center",
        });
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            //console.log("updated profile");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setRegistering(false);
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

  const handleClick = () => {
    setLoading(true);
    googleSignIn()
      .then(() => {
        toast.success("You have signed up successfully.", {
          position: "top-center",
        });
        setLoading(false);
        navigate(location?.state ? location.state : "/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="card  w-full max-w-lg shrink-0 shadow-2xl p-8">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center pt-4">
          Registration Form
        </h2>
        <hr className="mt-4 text-black" />
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered bg-blue-50"
              required
              ref={inputRef}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
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
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={open ? "password" : "text"}
              placeholder="password"
              name="password"
              className="input input-bordered bg-blue-50"
              required
            />
            <div
              className="absolute top-[60%]  left-[90%]  cursor-pointer"
              onClick={handleEye}
            >
              {open ? (
                <FaEye title="show password"></FaEye>
              ) : (
                <FaEyeSlash title="hide password"></FaEyeSlash>
              )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={registering}>
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            className="btn btn-accent  w-max py-4 bg-blue-50"
            onClick={handleClick}
          >
            <FaGoogle></FaGoogle>Sign In With Google
          </button>
        </div>
        <p className="text-center py-4">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
