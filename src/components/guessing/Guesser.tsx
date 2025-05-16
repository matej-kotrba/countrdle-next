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
import { Globe, MapPin, Flag, Award, RefreshCw, Lightbulb } from "lucide-react";
import { ReactNode, useCallback, useEffect, useLayoutEffect } from "react";
import countries from "@/data/countries-client.json";
// import countries from "@/data/countries.json";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { GuessContextProvider, useGuessContext } from "./GuessContext";
import { Country, CountryClient } from "@/types/country";
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
    addGuessedCountry(1);
    addGuessedCountry(8);
    addGuessedCountry(15);
    addGuessedCountry(9);
    setSelectedCountryIndex(undefined);
  }, [countries, resetGuessedCountryIndexes, setCountryToGuessIndex]);

  useLayoutEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🥳 You win! 🥳</DialogTitle>
            <DialogDescription>
              {countryToGuessIndex && (
                <div className="break-before-left">
                  <span className="font-bold">Congratulations</span>, you managed to get the right
                  answer{" "}
                  <span className="font-bold text-foreground whitespace-nowrap">
                    {countries[countryToGuessIndex].name}
                  </span>{" "}
                  in&nbsp;
                  <span className="font-bold text-foreground">
                    {guessedCountryIndexes.size}&nbsp;attempts.
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card
        className="border-8 shadow-xl"
        style={{
          background:
            "linear-gradient(rgba(255,255,255,0.05) 0 0) padding-box, linear-gradient(135deg, var(--color-indigo-600) -50%, var(--color-orange-700) 150%) padding-box, linear-gradient(-45deg, var(--color-indigo-600), var(--color-orange-700)) border-box",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <CardTitle className="text-2xl">Countrdle</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-purple-300 bg-slate-700"
              >
                <Award className="w-3 h-3" />
                <span>Attempts: {guessedCountryIndexes.size}</span>
              </Badge>
            </div>
          </div>
          <CardDescription className="text-card-foreground">
            Use the clues to guess the country. More clues will be revealed after incorrect guesses.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Guess input */}
          <GuessInput onSubmit={handleSubmitGuess} />

          <div className="grid grid-cols-2 gap-4">
            <AttemptListSection />
            <HintListSection countryToGuessDetail={countryToGuessDetail} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-4 border-t border-white/40">
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="flex items-center gap-1 ml-auto"
          >
            <RefreshCw className="w-4 h-4" />
            New Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

type ListSectionProps = {
  header: ReactNode;
  children: ReactNode;
};

function ListSection({ header, children }: ListSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-medium">{header}</h3>
      {children}
    </div>
  );
}

function AttemptListSection() {
  return (
    <ListSection
      header={
        <>
          <MapPin className="w-5 h-5 text-pink-400" />
          <span>Attempts</span>
        </>
      }
    >
      <AttemptList />
    </ListSection>
  );
}

function HintListSection({ countryToGuessDetail }: { countryToGuessDetail: Maybe<Country> }) {
  return (
    <ListSection
      header={
        <>
          <Lightbulb className="w-5 h-5 text-pink-400" />
          <span>Hints</span>
        </>
      }
    >
      <Show when={countryToGuessDetail}>
        {(countryToGuessDetail) => <HintList countryToGuessDetail={countryToGuessDetail} />}
      </Show>
    </ListSection>
  );
}

export default function GuesserWrapper() {
  return (
    <GuessContextProvider countriesProps={countries as CountryClient[]}>
      <Guesser />
    </GuessContextProvider>
  );
}
