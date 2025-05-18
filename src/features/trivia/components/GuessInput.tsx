"use client";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { ComponentRef, useRef, useState } from "react";
import { useGuessContext } from "../ContextProvider";

type Props = {
  onSubmit: (countryGuessIndex: number) => void;
};

export default function GuessInput({ onSubmit }: Props) {
  const { selectedCountryIndex } = useGuessContext();

  const submitButtonRef = useRef<ComponentRef<"button">>(null);

  function handleSubmit() {
    if (selectedCountryIndex === undefined) return;

    onSubmit(selectedCountryIndex);
  }

  function onCountrySelect() {
    submitButtonRef.current?.focus();
  }

  return (
    <div className="flex gap-2">
      <CountrySelector onCountrySelect={onCountrySelect} />
      <Button ref={submitButtonRef} onClick={handleSubmit} variant="outline" size="default">
        Guess
      </Button>
    </div>
  );
}

type CountrySelectorProps = {
  onCountrySelect?: () => void;
};

function CountrySelector({ onCountrySelect }: CountrySelectorProps) {
  const {
    countries,
    guessedCountryIndexes,
    countryToGuessIndex,
    selectedCountryIndex,
    setSelectedCountryIndex,
  } = useGuessContext();

  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState<boolean>(false);

  function handleCountrySelect(countryIndex: number) {
    setSelectedCountryIndex(countryIndex);
    setIsCountrySelectOpen(false);
    onCountrySelect?.();
  }

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
      <PopoverContent className="duration-0 w-64 p-0 bg-black/10">
        <Command>
          <CommandInput
            placeholder="Search country..."
            className="h-9 placeholder:text-foreground"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country, countryIdx) =>
                !guessedCountryIndexes.has(countryIdx) ? (
                  <CommandItem
                    key={country.name}
                    value={country.name}
                    onSelect={() => handleCountrySelect(countryIdx)}
                    className="data-[selected=true]:bg-white/10"
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
