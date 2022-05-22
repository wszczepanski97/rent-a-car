import { klienci, pracownicy } from ".prisma/client";
import { UserRole } from "templates/common/login";

export type Profile = ProfileClient | ProfileAdmin;

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
  type: UserRole.client;
  user: ClientUser | null;
};

export type ProfileAdmin = {
  type: UserRole.coordinator;
  user: CoordinatorUser | null;
};
