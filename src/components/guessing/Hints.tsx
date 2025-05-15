"use client";

import { Country } from "@/types/country";
import { getClues, THint } from "./utils";
import { useGuessContext } from "./GuessContext";
import Show from "../logic/Show";

export function Hint({ hint }: { hint: THint }) {
  return (
    <div className="grid grid-cols-subgrid col-span-3">
      <span className="bg-gray-700 px-2 py-1 rounded-lg font-semibold">{hint.title}</span>
      <div className="bg-gray-700 px-2 py-1 rounded-lg">
        <span className="font-semibold">{hint.value()}</span>{" "}
        <Show when={hint.suffix}>
          <span className="text-white/50">{hint.suffix}</span>
        </Show>
      </div>
    </div>
  );
}

type HintListProps = {
  countryToGuessDetail: Country;
};

export function HintList({ countryToGuessDetail }: HintListProps) {
  const { guessedCountryIndexes } = useGuessContext();

  return (
    <div className="grid grid-cols-[repeat(3,max-content)] gap-1">
      <Show when={countryToGuessDetail}>
        {(detail) =>
          getClues(detail)
            .slice(0, guessedCountryIndexes.size)
            .map((hint) => <Hint key={hint.title} hint={hint} />)
        }
      </Show>
    </div>
  );
}
