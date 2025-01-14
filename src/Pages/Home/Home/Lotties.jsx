import Lottie from "lottie-react";
import thinking from "../../../assets/ThinkingGuy.json";
import QnA from "../../../assets/QnA.json";
const Lotties = () => {
  return (
    <div className="flex my-12">
      <Lottie animationData={QnA} className="w-1/2"></Lottie>
      <Lottie animationData={thinking} className="w-1/2"></Lottie>
    </div>
  );
};

export default Lotties;
