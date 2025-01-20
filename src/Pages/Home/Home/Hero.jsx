import PropTypes from "prop-types";

const Hero = ({ banner, title, subtitle }) => {
  return (
    <div
      className={`hero h-full w-full ${banner} bg-cover bg-no-repeat bg-center`}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg text-white/90">
          <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold">
            {title}
          </h1>
          <p className="mb-5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
Hero.propTypes = {
  banner: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
