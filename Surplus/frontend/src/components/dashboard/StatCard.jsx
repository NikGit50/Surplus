const StatCard = ({
  title,
  value,
  icon,
  color = "green",
}) => {
  const colors = {
    green:
      "bg-green-50 text-green-700",
    blue:
      "bg-blue-50 text-blue-700",
    orange:
      "bg-orange-50 text-orange-700",
    red:
      "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <div
          className={`rounded-xl p-3 ${colors[color]}`}
        >
          {icon}
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;
