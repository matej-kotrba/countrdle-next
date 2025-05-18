"use client";

import { Country } from "@/types/country";
import { getClues, THint } from "../utils";
import Show from "../../../components/logic/Show";
import { useGuessContext } from "../ContextProvider";

export function Hint({ hint }: { hint: THint }) {
  return (
    <div className="grid col-span-3 grid-cols-subgrid hover:*:bg-orange-500/60 duration-100">
      <span className="px-2 py-1 font-semibold bg-orange-500/20 rounded-lg">{hint.title}</span>
      <div className="px-4 py-1 bg-orange-500/20 rounded-lg">
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
    <div className="grid grid-cols-[1fr_auto] gap-1">
      <Show when={countryToGuessDetail}>
        {(detail) =>
          getClues(detail)
            .slice(0, guessedCountryIndexes.size + 1)
            .map((hint) => <Hint key={hint.title} hint={hint} />)
        }
      </Show>
    </div>
  );
}
