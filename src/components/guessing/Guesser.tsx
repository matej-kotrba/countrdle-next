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
import { Globe, MapPin, Flag, Clock, Award, RefreshCw, ChevronsUpDown } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import countries from "@/data/countries-client.json";
// import countries from "@/data/countries.json";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import GuessCountryAttempt from "./GuessedCountry";
import { GuessContextProvider } from "./GuessContext";

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

export default function Guesser() {
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState<boolean>(false);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<Maybe<number>>(undefined);

  const [countryToGuessIndex, setCountryToGuessIndex] = useState<number>(
    getRandomNewCountryIndexToGuess()
  );
  const [guessedCountriesIndexes, setGuessedCountriesIndexes] = useState<number[]>([4, 5, 8]);

  function handleSubmitGuess() {
    if (selectedCountryIndex === undefined) return;

    if (selectedCountryIndex === countryToGuessIndex) {
      alert("You win");
    } else {
      setGuessedCountriesIndexes((old) => [...old, selectedCountryIndex]);
      setSelectedCountryIndex(undefined);
    }
  }

  function resetGame() {
    setCountryToGuessIndex(getRandomNewCountryIndexToGuess());
    setGuessedCountriesIndexes([]);
    setSelectedCountryIndex(undefined);
  }

  useLayoutEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  return (
    <GuessContextProvider countriesProps={countries}>
      <div className="max-w-3xl mx-auto">
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
              Use the clues to guess the country. More clues will be revealed after incorrect
              guesses.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Guess input */}
            <div className="flex gap-2">
              <Popover open={isCountrySelectOpen} onOpenChange={setIsCountrySelectOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isCountrySelectOpen}
                    className="w-[200px] justify-between"
                  >
                    {selectedCountryIndex !== undefined
                      ? `${countries[selectedCountryIndex].flag} ${countries[selectedCountryIndex].name}`
                      : "Select a country..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {countries
                          .filter((_, countryIdx) => !guessedCountriesIndexes.includes(countryIdx))
                          .map((country, countryIdx) => (
                            <CommandItem
                              key={country.name}
                              value={country.name}
                              onSelect={() => {
                                setSelectedCountryIndex(countryIdx);
                                setIsCountrySelectOpen(false);
                              }}
                            >
                              {country.flag} {country.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                onClick={handleSubmitGuess}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Guess
              </Button>
            </div>

            {/* Clues section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span>Clues</span>
                <div></div>
              </h3>
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
    </GuessContextProvider>
  );
}

// type GuessedCountriesListProps = {
//   countriesIndexes: number[];
// };

// function GuessedCountriesList({ countriesIndexes }: GuessedCountriesListProps) {
//   return countriesIndexes.map((index) => <GuessCountryAttempt />);
// }
