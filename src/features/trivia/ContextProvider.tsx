import { CountryClient } from "@/types/country";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";

type TGuessContext = {
  countries: CountryClient[];
  countryToGuessIndex: Maybe<number>;
  setCountryToGuessIndex: Dispatch<SetStateAction<Maybe<number>>>;
  guessedCountryIndexes: Set<number>;
  selectedCountryIndex: Maybe<number>;
  setSelectedCountryIndex: Dispatch<SetStateAction<Maybe<number>>>;

  addGuessedCountry: (index: number) => void;
  resetGuessedCountryIndexes: () => void;
};

const GuessContext = createContext<Maybe<TGuessContext>>(undefined);

type GuessContextProviderProps = {
  children: ReactNode;
  countriesProps: TGuessContext["countries"];
};

export function GuessContextProvider({ children, countriesProps }: GuessContextProviderProps) {
  const [countries] = useState<TGuessContext["countries"]>(countriesProps);
  const [countryToGuessIndex, setCountryToGuessIndex] =
    useState<TGuessContext["countryToGuessIndex"]>();
  const [guessedCountryIndexes, setGuessedCountryIndexes] = useState<
    TGuessContext["guessedCountryIndexes"]
  >(new Set<number>());
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<Maybe<number>>(undefined);

  const addGuessedCountry = useCallback((index: number) => {
    setGuessedCountryIndexes((old) => new Set(old).add(index));
  }, []);

  const resetGuessedCountryIndexes = useCallback(() => {
    setGuessedCountryIndexes(() => new Set());
  }, []);

  const providerData = useMemo(
    () => ({
      countries,
      countryToGuessIndex,
      guessedCountryIndexes,
      setCountryToGuessIndex,
      addGuessedCountry,
      resetGuessedCountryIndexes,
      selectedCountryIndex,
      setSelectedCountryIndex,
    }),
    [
      addGuessedCountry,
      countries,
      countryToGuessIndex,
      guessedCountryIndexes,
      resetGuessedCountryIndexes,
      selectedCountryIndex,
      setSelectedCountryIndex,
    ]
  );

  return <GuessContext.Provider value={providerData}>{children}</GuessContext.Provider>;
}

export function useGuessContext() {
  const context = use(GuessContext);

  if (!context) {
    throw new Error("Guess context must be accessed in a GuessContextProvider!");
  }

  return context;
}
