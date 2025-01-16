import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

const Nothing = ({ title }) => {
  return (
    <Fade>
      <div className="text-center grid place-items-center min-h-[500px]">
        <img
          src={
            "https://i.ibb.co.com/1bqzDL3/hand-drawn-no-data-illustration-23-2150696452.jpg"
          }
          alt=""
        />
        <h2 className="text-xl lg:text-3xl font-bold mb-4">{title}</h2>
      </div>
    </Fade>
  );
};

Nothing.propTypes = {
  title: PropTypes.string,
};

export default Nothing;
