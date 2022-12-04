import { wyplaty } from "@prisma/client";

export type Service = {
  IdUszkodzenia: number;
  IdUslugi: number;
  AutoryzowanySerwis: boolean | null;
  SamodzielnaNaprawa: boolean | null;
  Warsztat: boolean | null;
  DataOd: Date;
  DataDo: Date;
  IdSamochod: number;
  Samochod: string;
  Status: string;
};

export type Services = {
  paychecks?: wyplaty[];
  pastservices?: Service[];
  currentservice?: Service;
  futureservices?: Service[];
  availableservices?: Service[];
};
