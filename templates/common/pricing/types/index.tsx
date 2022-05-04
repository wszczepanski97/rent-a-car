import { samochody, samochodyszczegoly } from "@prisma/client";

export type Cars = Pick<
  samochody,
  "CenaZaDzien" | "IdSamochody" | "Marka" | "Model" | "Zdjecia"
> &
  Omit<
    samochodyszczegoly,
    "IdSamochodySzczegoly" | "IloscDrzwi" | "PojemnoscBagaznika"
  >;

export type PricingPageProps = {
  cars: Cars[];
};
