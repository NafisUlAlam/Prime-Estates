const Card = ({ children, className }) => {
  return (
    <div className={`bg-primary/80 rounded-2xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardContent };
