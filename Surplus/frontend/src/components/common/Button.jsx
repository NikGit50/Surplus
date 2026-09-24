const Button = ({
  children,
  type = "button",
  loading = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
    warning:
      "bg-orange-500 hover:bg-orange-600 text-white",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`rounded-xl px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {loading
        ? "Please wait..."
        : children}
    </button>
  );
};

export default Button;
