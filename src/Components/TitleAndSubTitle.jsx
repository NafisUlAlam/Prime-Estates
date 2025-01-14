import PropTypes from "prop-types";

const TitleAndSubTitle = ({ title, subtitle }) => {
  return (
    <div className=" text-center my-12">
      <h2 className="text-xl lg:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-base font-semibold opacity-70">{subtitle}</p>
    </div>
  );
};

TitleAndSubTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
export default TitleAndSubTitle;
