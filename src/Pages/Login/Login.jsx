import { useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Login = () => {
  const { signIn, googleSignIn, setLoading } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //console.log(location);
  useDocumentTitle(`Login|Suggestify`);
  //console.log(loading);
  //console.log(location);
  //on render complete, email is focused
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current.focus();
  }, []);

  //form submission
  const handleSubmit = (e) => {
    //prevent default behavior
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(email, password);
    signIn(email, password)
      .then(() => {
        //console.log(result.user);
        toast.success("You have signed in successfully.", {
          position: "top-center",
        });
        navigate(location?.state ? location.state : "/", { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        //console.log(loading);
        setLoading(false);
        setError(err.message);
        e.target.reset();
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
        //console.log(res.user);
        navigate(location?.state ? location.state : "/", { replace: true });
        setLoading(false);
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
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="card  p-8 w-full max-w-lg shrink-0 shadow-2xl">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center pt-4">
          Login Form
        </h2>
        <hr className="mt-4 text-black" />
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered bg-blue-50"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              ref={inputRef}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered bg-blue-50"
              required
            />
            <label className="label">
              <Link
                to="/forgotpassword"
                state={{ email }}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Log In</button>
          </div>
        </form>

        <div className="text-center">
          <button className="btn  w-max py-4 btn-accent" onClick={handleClick}>
            <FaGoogle></FaGoogle>Sign In With Google
          </button>
        </div>
        <p className="text-center py-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            state={location?.state}
            replace
            className="font-bold underline"
          >
            Register
          </Link>{" "}
        </p>
        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
