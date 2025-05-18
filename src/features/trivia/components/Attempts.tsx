"use client";

import { useEffect, useRef } from "react";
import { getCountryDistance, getDirectionBetweenCountriesAsEmoji } from "../utils";
import { useGuessContext } from "../ContextProvider";

type Props = {
  guessedCountryIndex: number;
};

export function Attempt({ guessedCountryIndex }: Props) {
  const { countries, countryToGuessIndex } = useGuessContext();

  if (!countryToGuessIndex) return <p>No country to guess</p>;

  const country = countries[guessedCountryIndex];
  const countryToGuess = countries[countryToGuessIndex];

  return (
    <div className="grid col-span-3 overflow-hidden grid-cols-subgrid hover:*:bg-indigo-600/80 duration-100 ">
      <span
        className="px-2 py-1 overflow-hidden font-semibold bg-indigo-600/40 rounded-lg whitespace-nowrap overflow-ellipsis"
        title={country.name}
      >
        {country.flag} {country.name}
      </span>
      <div className="px-2 py-1 bg-indigo-600/40 rounded-lg">
        <span className="font-semibold">
          {getCountryDistance(countryToGuess.latLng, country.latLng).toLocaleString()}
        </span>{" "}
        <span className="text-white/50">km</span>
      </div>
      <span className="px-2 py-1 bg-indigo-600/40 rounded-lg">
        {getDirectionBetweenCountriesAsEmoji(countryToGuess.latLng, country.latLng)}
      </span>
    </div>
  );
}

export function AttemptList() {
  const { guessedCountryIndexes } = useGuessContext();
  const divElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divElementRef.current?.scrollBy({ top: 99999999 });
  }, [guessedCountryIndexes]);

  return (
    <div
      ref={divElementRef}
      className="grid grid-cols-[1fr_max-content_auto] gap-1 max-h-[calc(32px*7+4px*6)] overflow-y-auto"
    >
      {[...guessedCountryIndexes].map((guessedCountryIndex) => (
        <Attempt guessedCountryIndex={guessedCountryIndex} key={guessedCountryIndex} />
      ))}
    </div>
  );
}
