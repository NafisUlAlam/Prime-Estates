import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Error = () => {
  const navigate = useNavigate();

  //console.log(location);
  useDocumentTitle(`Error|Suggestify`);
  return (
    <div className="min-h-screen flex items-center justify-center bg-banner3 bg-center bg-no-repeat bg-cover text-white">
      <div>
        <div className="flex justify-center items-center">
          <img src="https://i.ibb.co.com/1Gpjc9M/6478111.png" alt="" />
        </div>
        <h2 className="text-bold text-xl md:text-3xl my-8">
          Oops! Looks like you are lost!!!
        </h2>
        <div className="text-center">
          <button
            className="btn btn-outline text-white"
            onClick={() => navigate("/", { replace: true })}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
