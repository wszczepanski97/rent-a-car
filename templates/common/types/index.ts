import { UserRole } from "templates";

// CARS
export type Cars = {
  RodzajPaliwa: string;
  Nadwozie: string;
  PojemnoscBagaznika: string;
  IloscDrzwi: string;
  IloscMiejsc: string;
  CenaZaDzien: number;
  IdSamochody: number;
  Nazwa: string;
  Zdjecie: string;
};

//PROFILES
export type ClientUser = {
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
  IdKlienci: number;
  ProcentRabatu: number | null;
  IdLokalizacje: number;
};

export type CoordinatorUser = {
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
  IdLokalizacje: number;
  IdStanowiska: number;
};

export type ProfileClient = {
  type: UserRole.CLIENT;
  user: ClientUser | null;
};

export type ProfileAdmin = {
  type: UserRole.COORDINATOR;
  user: CoordinatorUser | null;
};

export type Profile = ProfileClient | ProfileAdmin;
