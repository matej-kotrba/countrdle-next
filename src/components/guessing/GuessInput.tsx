"use client";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useGuessContext } from "./GuessContext";
import { useState } from "react";

type Props = {
  onSubmit: (countryGuessIndex: number) => void;
};

export default function GuessInput({ onSubmit }: Props) {
  const { selectedCountryIndex } = useGuessContext();

  function handleSubmit() {
    if (selectedCountryIndex === undefined) return;

    onSubmit(selectedCountryIndex);
  }

  return (
    <div className="flex gap-2">
      <CountrySelector />
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
}

type ButtonProps = {
  handleSubmit: () => void;
};

function SubmitButton({ handleSubmit }: ButtonProps) {
  return (
    <Button
      onClick={handleSubmit}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    >
      Guess
    </Button>
  );
}

function CountrySelector() {
  const {
    countries,
    guessedCountryIndexes,
    countryToGuessIndex,
    selectedCountryIndex,
    setSelectedCountryIndex,
  } = useGuessContext();

  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState<boolean>(false);

  return (
    <Popover open={isCountrySelectOpen} onOpenChange={setIsCountrySelectOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isCountrySelectOpen}
          className="w-64 justify-between"
          disabled={guessedCountryIndexes.has(countryToGuessIndex!)}
        >
          {selectedCountryIndex !== undefined
            ? `${countries[selectedCountryIndex].flag} ${countries[selectedCountryIndex].name}`
            : "Select a country..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country, countryIdx) =>
                !guessedCountryIndexes.has(countryIdx) ? (
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
                ) : null
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
