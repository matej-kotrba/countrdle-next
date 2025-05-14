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
    <div className="grid grid-cols-subgrid col-span-3">
      <span className="bg-gray-700 px-2 py-1 rounded-lg font-semibold">
        {country.flag} {country.name}
      </span>
      <div className="bg-gray-700 px-2 py-1 rounded-lg">
        <span className="font-semibold">
          {getCountryDistance(countryToGuess.latLng, country.latLng).toLocaleString()}
        </span>
        <span className="text-white/50 ml-1">km</span>
      </div>
      <span className="bg-gray-700 px-2 py-1 rounded-lg">
        {getDirectionBetweenCountriesAsEmoji(countryToGuess.latLng, country.latLng)}
      </span>
    </div>
  );
}

export function AttemptList() {
  const { guessedCountryIndexes } = useGuessContext();

  return (
    <div className="grid grid-cols-[repeat(3,max-content)] gap-1">
      {[...guessedCountryIndexes].map((guessedCountryIndex) => (
        <Attempt guessedCountryIndex={guessedCountryIndex} key={guessedCountryIndex} />
      ))}
    </div>
  );
}
