import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const TitleAndSubTitle = ({ title, subtitle }) => {
  return (
    <Fade>
      <div className=" text-center my-12 text-text">
        <h2 className="text-xl lg:text-3xl font-bold mb-4">{title}</h2>
        <p className=" font-semibold opacity-70">{subtitle}</p>
      </div>
    </Fade>
  );
};

TitleAndSubTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
export default TitleAndSubTitle;
