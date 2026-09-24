import {
  Link,
} from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-black">
        404
      </h1>

      <p className="mt-3 text-gray-500">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 text-white"
      >
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
