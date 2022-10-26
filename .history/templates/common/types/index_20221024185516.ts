import { klienci } from "@prisma/client";
import { UserRole } from "templates";

// CARS
export type Cars = {
  RodzajPaliwa: string;
  Nadwozie: string;
  PojemnoscBagaznika: string;
  IloscDrzwi: string;
  IloscMiejsc: string;
  CenaZaGodzine: number;
  IdSamochody: number;
  Nazwa: string;
  Zdjecie: string;
};

//PROFILES

export type ProfileClient = {
  type: UserRole.CLIENT;
  user: klienci | null;
};

export type ProfileEmployee = {
  type:
    | UserRole.COORDINATOR
    | UserRole.CLEANER
    | UserRole.DRIVER
    | UserRole.MECHANIC;
  user: pracownicy | null;
};

export type Profile = ProfileClient | ProfileEmployee;
