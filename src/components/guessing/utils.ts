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

function getDirectionBetweenCountriesLatLonAsEmoji(
  countryToGuessLatLon: LatLon,
  countryGuessAttemptLatLon: LatLon
) {
  const [lat1, lng1] = countryToGuessLatLon;
  const [lat2, lng2] = countryGuessAttemptLatLon;

  // Calculate the difference and create an arrow icon depending on it
  const x = lng2 - lng1;
  const y = lat2 - lat1;
  const c = Math.sqrt(x ** 2 + y ** 2);

  const directions = ["➡️", "↗️", "⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️"];

  let angle = Math.atan2(y / c, x / c);
  if (angle < 0) angle += 2 * Math.PI;
  let n = 0;
  let i = 0;

  while (Math.abs(n - angle) > Math.PI / 4 / 2) {
    n += Math.PI / 4;
    i++;
  }

  return directions[i];
}

export { getCountryDistance, getDirectionBetweenCountriesLatLonAsEmoji };
