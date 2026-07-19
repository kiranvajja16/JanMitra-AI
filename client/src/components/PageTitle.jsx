const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="text-gray-300 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;