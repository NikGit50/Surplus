export const calculateRoute = async (
  start,
  end
) => {
  const [startLon, startLat] = start;
  const [endLon, endLat] = end;

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${startLon},${startLat};${endLon},${endLat}` +
    `?overview=full&geometries=geojson`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Routing service unavailable");
  }

  const data = await response.json();

  if (
    !data.routes ||
    !data.routes.length
  ) {
    throw new Error("No route found");
  }

  const route = data.routes[0];

  return {
    distance: route.distance,
    duration: route.duration,
    geometry: route.geometry,
  };
};
