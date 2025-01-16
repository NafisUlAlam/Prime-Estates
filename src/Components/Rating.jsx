import PropTypes from "prop-types";

const Rating = ({ value, maxStars = 5 }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg
          key={`full-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.428L24 9.764l-6 5.841 1.418 8.263L12 18.896l-7.418 4.972L6 15.605l-6-5.841 8.332-1.75z" />
        </svg>
      ))}

      {/* Half Star */}
      {halfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 .587l3.668 7.428L24 9.764l-6 5.841 1.418 8.263L12 18.896V.587z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M12 .587l3.668 7.428L24 9.764l-6 5.841 1.418 8.263L12 18.896 4.582 23.868 6 15.605l-6-5.841 8.332-1.75z"
          />
        </svg>
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg
          key={`empty-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.428L24 9.764l-6 5.841 1.418 8.263L12 18.896l-7.418 4.972L6 15.605l-6-5.841 8.332-1.75z" />
        </svg>
      ))}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  maxStars: PropTypes.number,
};

export default Rating;
