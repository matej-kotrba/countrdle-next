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
import { Globe, MapPin, Award, RefreshCw, Lightbulb } from "lucide-react";
import { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from "react";
import countries from "@/data/countries-client.json";
// import countries from "@/data/countries.json";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { Country, CountryClient } from "@/types/country";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getCountryDataByIndex } from "./actions";
import { AttemptList } from "./components/Attempts";
import Show from "../../components/logic/Show";
import { GuessContextProvider, useGuessContext } from "./ContextProvider";
import GuessInput from "./components/GuessInput";
import { HintList } from "./components/Hints";

const getRandomNewCountryIndexToGuess = () => Math.round(Math.random() * countries.length);

function Trivia() {
  const {
    countries,
    countryToGuessIndex,
    guessedCountryIndexes,
    setCountryToGuessIndex,
    addGuessedCountry,
    resetGuessedCountryIndexes,
    setSelectedCountryIndex,
  } = useGuessContext();

  const [isVictoryDialogOpen, setIsVictoryDialogOpen] = useState(false);

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
      setIsVictoryDialogOpen(true);
    }

    addGuessedCountry(countryGuessIndex);
    setSelectedCountryIndex(undefined);
  }

  const resetGame = useCallback(() => {
    setCountryToGuessIndex(getRandomNewCountryIndexToGuess());
    resetGuessedCountryIndexes();
    setSelectedCountryIndex(undefined);
  }, [resetGuessedCountryIndexes, setCountryToGuessIndex, setSelectedCountryIndex]);

  useLayoutEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Dialog open={isVictoryDialogOpen} onOpenChange={setIsVictoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🥳 You win! 🥳</DialogTitle>
            <DialogDescription className="break-before-left text-foreground">
              {countryToGuessIndex && (
                <>
                  <span className="font-bold">Congratulations</span>, you managed to get the right
                  answer{" "}
                  <span className="font-bold text-foreground whitespace-nowrap">
                    {countries[countryToGuessIndex].name}
                  </span>{" "}
                  in&nbsp;
                  <span className="font-bold text-foreground">
                    {guessedCountryIndexes.size}&nbsp;attempts.
                  </span>
                </>
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
                className="flex items-center gap-1 border-2 bg-white/5 shadow-md"
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
            className="flex items-center gap-1 ml-auto shadow-md"
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

export default function TriviaWithContext() {
  return (
    <GuessContextProvider countriesProps={countries as CountryClient[]}>
      <Trivia />
    </GuessContextProvider>
  );
}
