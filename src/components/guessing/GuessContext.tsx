import { CountryClient } from "@/types/country";
import { createContext, Dispatch, ReactNode, SetStateAction, use, useState } from "react";

type TGuessContext = {
  countries: CountryClient[];
  countryToGuessIndex: Maybe<number>;
  setCountryToGuessIndex: Dispatch<SetStateAction<Maybe<number>>>;
};

const GuessContext = createContext<TGuessContext>({
  countries: [],
  countryToGuessIndex: undefined,
  setCountryToGuessIndex: () => {},
});

type GuessContextProviderProps = {
  children: ReactNode;
  countriesProps: TGuessContext["countries"];
};

export function GuessContextProvider({ children, countriesProps }: GuessContextProviderProps) {
  const [countries] = useState<TGuessContext["countries"]>(countriesProps);
  const [countryToGuessIndex, setCountryToGuessIndex] =
    useState<TGuessContext["countryToGuessIndex"]>(undefined);

  return (
    <GuessContext.Provider value={{ countries, countryToGuessIndex, setCountryToGuessIndex }}>
      {children}
    </GuessContext.Provider>
  );
}

export function useGuessContext() {
  const context = use(GuessContext);

  if (!context) {
    throw new Error("Guess context must be accessed in a GuessContextProvider!");
  }

  return context;
}
