"use client";

import countries from "@/data/countries-client.json";

type Props = {
  guessedCountryIdx: number;
  countryToGuessIdx: number;
};

export default function GuessCountryAttempt({ guessedCountryId, countryToGuess }: Props) {}
