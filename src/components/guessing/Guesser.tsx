"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Flag, Clock, Award, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect } from "react";
import countries from "@/data/countries-client.json";
// import countries from "@/data/countries.json";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { GuessContextProvider, useGuessContext } from "./GuessContext";
import { CountryClient } from "@/types/country";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getCountryDataByIndex } from "./actions";
import { AttemptList } from "./Attempts";
import GuessInput from "./GuessInput";
import { HintList } from "./Hints";
import Show from "../logic/Show";

// function logClientCountryJSON() {
//   console.log(
//     JSON.stringify(
//       countries.map((country) => {
//         return {
//           name: country.name.common,
//           flag: country.flag,
//           latLng: country.latlng,
//         };
//       })
//     )
//   );
// }

const getRandomNewCountryIndexToGuess = () => Math.round(Math.random() * countries.length);

function Guesser() {
  const {
    countries,
    countryToGuessIndex,
    guessedCountryIndexes,
    setCountryToGuessIndex,
    addGuessedCountry,
    resetGuessedCountryIndexes,
    setSelectedCountryIndex,
  } = useGuessContext();

  const { data: countryToGuessDetail } = useQuery({
    queryKey: ["country", countryToGuessIndex],
    queryFn: async ({ queryKey }) => {
      const countryIndex = queryKey[1] as number;

      const data = await getCountryDataByIndex(countryIndex);
      return data;
    },
    enabled: countryToGuessIndex !== undefined,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
  });

  function handleSubmitGuess(countryGuessIndex: number) {
    if (countryGuessIndex === countryToGuessIndex) {
      alert("You win");
    }

    addGuessedCountry(countryGuessIndex);
    setSelectedCountryIndex(undefined);
  }

  const resetGame = useCallback(() => {
    const random = getRandomNewCountryIndexToGuess();
    console.log(countries[random]);
    setCountryToGuessIndex(random);
    resetGuessedCountryIndexes();
    addGuessedCountry(2);
    addGuessedCountry(5);
    addGuessedCountry(8);
    setSelectedCountryIndex(undefined);
  }, [countries, resetGuessedCountryIndexes, setCountryToGuessIndex]);

  useLayoutEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="max-w-3xl mx-auto">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🥳 You win! 🥳</DialogTitle>
            <DialogDescription>
              {countryToGuessIndex && (
                <>
                  Congratulations, you managed to get the right answer{" "}
                  <span className="font-bold text-foreground">
                    {countries[countryToGuessIndex].name}
                  </span>{" "}
                  in <span className="font-bold text-foreground">{guessedCountryIndexes.size}</span>{" "}
                  attempts.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="bg-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-2xl">Countrdle</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-slate-700 text-purple-300 flex items-center gap-1"
              >
                <Award className="h-3 w-3" />
                <span>Score: {0}</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-slate-700 text-amber-300 flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                <span>{0}s</span>
              </Badge>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Use the clues to guess the country. More clues will be revealed after incorrect guesses.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Guess input */}
          <GuessInput onSubmit={handleSubmitGuess} />

          <div className="grid grid-cols-2">
            {/* Attempts section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span>Attempts</span>
              </h3>
              <AttemptList />
            </div>

            {/* Clues section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span>Clues</span>
              </h3>
            </div>
            <div>
              <Show when={countryToGuessDetail}>
                {(countryToGuessDetail) => <HintList countryToGuessDetail={countryToGuessDetail} />}
              </Show>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
          <div className="text-sm text-slate-400 flex items-center gap-1">
            <Flag className="h-4 w-4" />
            <span>Attempts: {0}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600 flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            New Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function GuesserWrapper() {
  return (
    <GuessContextProvider countriesProps={countries as CountryClient[]}>
      <Guesser />
    </GuessContextProvider>
  );
}
