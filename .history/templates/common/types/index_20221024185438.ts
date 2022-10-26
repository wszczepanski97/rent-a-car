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

type EmployeeUser = {
  IdUzytkownicy: number;
  Imie: string;
  Nazwisko: string;
  Pesel: string;
  NumerDowodu: string;
  NumerPrawaJazdy: string;
  Email: string;
  NumerTelefonu: string;
  Login: string;
  Haslo: string;
  Salt: string;
  Aktywny: boolean;
  IdPracownicy: number;
  IdStanowiska: number;
};

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
  user: EmployeeUser | null;
};

export type Profile = ProfileClient | ProfileEmployee;
