"use server";

import countries from "@/data/countries.json";

export async function getCountryDataByIndex(index: number) {
  return countries[index];
}
