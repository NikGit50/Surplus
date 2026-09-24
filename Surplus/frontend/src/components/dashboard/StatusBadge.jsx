const StatusBadge = ({
  status,
}) => {
  const styles = {
    POSTED:
      "bg-blue-100 text-blue-700",

    MATCHED:
      "bg-purple-100 text-purple-700",

    DRIVER_ASSIGNED:
      "bg-indigo-100 text-indigo-700",

    DRIVER_EN_ROUTE:
      "bg-yellow-100 text-yellow-700",

    PICKED_UP:
      "bg-orange-100 text-orange-700",

    IN_TRANSIT:
      "bg-orange-100 text-orange-700",

    DELIVERED:
      "bg-green-100 text-green-700",

    VERIFIED:
      "bg-green-100 text-green-700",

    CANCELLED:
      "bg-red-100 text-red-700",

    EXPIRED:
      "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status
        ?.replaceAll(
          "_",
          " "
        )}
    </span>
  );
};

export default StatusBadge;
