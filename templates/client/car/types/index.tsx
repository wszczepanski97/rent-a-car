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

export type Car =
  | (samochody & {
      samochodyszczegoly: samochodyszczegoly;
    })
  | null;

export type CarProps = {
  car: Car;
};
