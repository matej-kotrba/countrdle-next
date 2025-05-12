"use client";

import { useGuessContext } from "./GuessContext";
import { getCountryDistance, getDirectionBetweenCountriesAsEmoji } from "./utils";

type Props = {
  guessedCountryIndex: number;
};

export function GuessCountryAttempt({ guessedCountryIndex }: Props) {
  const { countries, countryToGuessIndex } = useGuessContext();

  if (!countryToGuessIndex) return <p>No country to guess</p>;

  const country = countries[guessedCountryIndex];
  const countryToGuess = countries[countryToGuessIndex];

  return (
    <div className="grid grid-cols-subgrid col-span-3">
      <span>
        {country.flag} {country.name}
      </span>
      <span>{getCountryDistance(countryToGuess.latLng, country.latLng)}km</span>
      <span>{getDirectionBetweenCountriesAsEmoji(countryToGuess.latLng, country.latLng)}</span>
    </div>
  );
}

export function GuessedCountriesList() {
  const { guessedCountryIndexes } = useGuessContext();

  return (
    <div className="grid grid-cols-[repeat(3,max-content)] gap-4">
      {[...guessedCountryIndexes].map((guessedCountryIndex) => (
        <GuessCountryAttempt guessedCountryIndex={guessedCountryIndex} key={guessedCountryIndex} />
      ))}
    </div>
  );
}
