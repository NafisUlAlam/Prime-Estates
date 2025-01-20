import { Fade, Slide } from "react-awesome-reveal";
import Banner from "./Banner";
import Motto from "./Motto";
import Dealerships from "./Dealerships";
import Lotties from "./Lotties";
import LatestReviews from "./LatestReviews";
import Advertisements from "./Advertisements";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Slide direction="right">
        <Motto></Motto>
        <Dealerships></Dealerships>
      </Slide>
      <Fade duration={500}>
        <Lotties></Lotties>
      </Fade>

      <Fade duration={900}>
        <WhyChooseUs></WhyChooseUs>
      </Fade>
      <Fade duration={700}>
        <Advertisements></Advertisements>
      </Fade>
      <Fade duration={1100}>
        <LatestReviews></LatestReviews>
      </Fade>
    </div>
  );
};

export default Home;
