"use client";

import { useGuessContext } from "./GuessContext";
import { getCountryDistance, getDirectionBetweenCountriesAsEmoji } from "./utils";

type Props = {
  guessedCountryIndex: number;
};

export function Attempt({ guessedCountryIndex }: Props) {
  const { countries, countryToGuessIndex } = useGuessContext();

  if (!countryToGuessIndex) return <p>No country to guess</p>;

  const country = countries[guessedCountryIndex];
  const countryToGuess = countries[countryToGuessIndex];

  return (
    <div className="grid col-span-3 overflow-hidden grid-cols-subgrid hover:*:bg-indigo-500">
      <span
        className="px-2 py-1 overflow-hidden font-semibold bg-indigo-600 rounded-lg whitespace-nowrap overflow-ellipsis"
        title={country.name}
      >
        {country.flag} {country.name}
      </span>
      <div className="px-2 py-1 bg-indigo-600 rounded-lg">
        <span className="font-semibold">
          {getCountryDistance(countryToGuess.latLng, country.latLng).toLocaleString()}
        </span>{" "}
        <span className="text-white/50">km</span>
      </div>
      <span className="px-2 py-1 bg-indigo-600 rounded-lg">
        {getDirectionBetweenCountriesAsEmoji(countryToGuess.latLng, country.latLng)}
      </span>
    </div>
  );
}

export function AttemptList() {
  const { guessedCountryIndexes } = useGuessContext();

  return (
    <div className="grid grid-cols-[1fr_max-content_auto] gap-1">
      {[...guessedCountryIndexes].map((guessedCountryIndex) => (
        <Attempt guessedCountryIndex={guessedCountryIndex} key={guessedCountryIndex} />
      ))}
    </div>
  );
}
