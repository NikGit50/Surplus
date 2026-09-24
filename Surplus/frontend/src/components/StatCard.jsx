const StatCard = ({
  title,
  value,
  icon,
  color = "green",
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div
          className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
