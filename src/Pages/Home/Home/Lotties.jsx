import Lottie from "lottie-react";
import thinking from "../../../assets/building.json";
import QnA from "../../../assets/anotherbuilding.json";
const Lotties = () => {
  return (
    <div className="flex my-12 justify-center items-center">
      <Lottie animationData={QnA} className="w-1/2 h-40"></Lottie>
      <Lottie animationData={thinking} className="w-1/2 h-40"></Lottie>
    </div>
  );
};

export default Lotties;
