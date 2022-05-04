import {
  samochody,
  samochodyszczegoly,
  uslugi,
  wypozyczenia,
} from "@prisma/client";
import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
  id: string;
}

type Car = samochody & {
  uslugi: (uslugi & { wypozyczenia: wypozyczenia[] })[];
} & {
  samochodyszczegoly: Omit<samochodyszczegoly, "IdSamochodySzczegoly">;
};

export type CarProps = {
  car: Car;
};
