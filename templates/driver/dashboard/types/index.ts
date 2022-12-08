import { relokacje, wyplaty } from "@prisma/client";

export type Service = relokacje & {
  IdUslugi: number;
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
