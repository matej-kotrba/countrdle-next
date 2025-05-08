const toRadians = (degree: number) => degree * (Math.PI / 180);

type LatLon = [number, number];

function getCountryDistance(latLon1: LatLon, latLon2: LatLon) {
  const R: number = 6371.0;

  let [lat1, lon1] = latLon1;
  let [lat2, lon2] = latLon2;

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Differences in coordinates
  const dlat: number = lat2 - lat1;
  const dlon: number = lon2 - lon1;

  // Haversine formula
  const a: number =
    Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance: number = R * c;

  return distance.toFixed(0);
}

function getCountryDirection(countryGuessAttemptLatLon: LatLon, countryToGuessLatLon: LatLon) {
  const [lat1, lng1] = countryToGuessLatLon;
  const [lat2, lng2] = countryGuessAttemptLatLon;

  const tolerance = 4;

  // Calculate the difference and create an arrow icon depending on it
  const latDiff = lat1 - lat2;
  const lngDiff = lng1 - lng2;

  const data = {
    up: "⬆️",
    leftup: "↖️",
    rightup: "↗️",
    down: "⬇️",
    leftdown: "↙️",
    rightdown: "↘️",
    left: "⬅️",
    right: "➡️",
  };

  let isTop = false;
  let isLeft = false;
  let isTween = false;
  let nonTweenDirection: "width" | "height" = "width";

  if (lngDiff < 0) {
    isLeft = true;
  }
  if (latDiff > 0) {
    isTop = true;
  }
  if (Math.abs(latDiff) <= tolerance && Math.abs(lngDiff) <= tolerance) {
    isTween = true;
  } else if (Math.abs(latDiff) > tolerance && Math.abs(lngDiff) > tolerance) {
    isTween = true;
  } else if (Math.abs(lngDiff) > tolerance) {
    nonTweenDirection = "width";
  } else {
    nonTweenDirection = "height";
  }

  if (isTop && isLeft && isTween) {
    return data.leftup;
  }
  if (isTop && isLeft && !isTween) {
    return nonTweenDirection === "width" ? data.left : data.up;
  }
  if (isTop && !isLeft && isTween) {
    return data.rightup;
  }
  if (isTop && !isLeft && !isTween) {
    return nonTweenDirection === "width" ? data.right : data.up;
  }
  if (!isTop && isLeft && isTween) {
    return data.leftdown;
  }
  if (!isTop && isLeft && !isTween) {
    return nonTweenDirection === "width" ? data.left : data.down;
  }
  if (!isTop && !isLeft && isTween) {
    return data.rightdown;
  }
  if (!isTop && !isLeft && !isTween) {
    return nonTweenDirection === "width" ? data.right : data.down;
  }
}
