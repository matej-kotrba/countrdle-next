"use client";

import { Country } from "@/types/country";
import { getClues } from "./utils";
import { useGuessContext } from "./GuessContext";

export function Hint() {}

type HintListProps = {
  countryToGuessDetail: Country;
};

export function HintList({ countryToGuessDetail }: HintListProps) {
  const { guessedCountryIndexes } = useGuessContext();

  return (
    <div>
      {countryToGuessDetail &&
        getClues(countryToGuessDetail)
          .slice(0, guessedCountryIndexes.size)
          .map((clue) => {
            return (
              <div key={clue.title}>
                {clue.title} {clue.value()}
              </div>
            );
          })}
    </div>
  );
}
