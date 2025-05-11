export type Country = {
  capital: string[];
  languages: {
    [key: string]: string;
  };
  borders: string[];
  flags: {
    png: string;
    svg: string;
  };
  flag: string;
  name: {
    common: string;
    official: string;
  };
  independent: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  region: string;
  subregion: string;
  landlocked: boolean;
  area: number;
  population: number;
  latlng: {
    0: number;
    1: number;
  };
};

export type CountryClient = {
  name: string;
  flag: string;
  latLng: number[];
};
