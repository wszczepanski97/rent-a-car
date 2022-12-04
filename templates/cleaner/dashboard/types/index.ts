import { wyplaty } from "@prisma/client";

export type Service = {
  IdMycie: number;
  IdUslugi: number;
  MyjniaBezdotykowa: boolean | null;
  MyjniaAutomatyczna: boolean | null;
  MyjniaPrywatna: boolean | null;
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
