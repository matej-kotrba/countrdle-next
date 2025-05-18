"use server";

import countries from "@/data/countries.json";
import { Country } from "@/types/country";

export async function getCountryDataByIndex(index: number) {
  return countries[index] as unknown as Country;
}
