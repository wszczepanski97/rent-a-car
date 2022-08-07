import { Service } from "pages/coordinator/calendar";
import { extend } from "@syncfusion/ej2-base";

const getNameOfService = (service: Service) =>
  !!service.wypozyczenia.length
    ? "Wypożyczenie"
    : !!service.uszkodzenia.length
    ? "Naprawa"
    : !!service.mycie.length
    ? "Mycie"
    : "Relokacja";

export type Data = {
  Id: number;
  Subject: string;
  Client?: number;
  StartTime: Date;
  EndTime: Date;
  Description: string;
  Type: string;
  AssignedWorker: number | null;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData = (services: Service[]) => {
  return extend(
    [],
    services!.map((service) => {
      const serviceName = getNameOfService(service);
      return {
        Id: service.IdUslugi,
        Subject: `${serviceName} ${service.samochody.Marka} ${service.samochody.Model}`,
        Client: service.wypozyczenia?.[0]?.IdKlienci,
        CategoryColor:
          serviceName === "Wypożyczenie"
            ? "#328ba8"
            : serviceName === "Mycie"
            ? "#91b52d"
            : serviceName === "Naprawa"
            ? "#b52d9c"
            : "#b5a32d",
        StartTime: new Date(
          new Date(service.DataOd).setHours(
            new Date(service.DataOd).getHours() - 2
          )
        ),
        EndTime: new Date(
          new Date(service.DataDo).setHours(
            new Date(service.DataDo).getHours() - 2
          )
        ),
        Description: service.Opis,
        Type: serviceName,
        AssignedWorker: service.IdPracownicy_Przypisanie,
        // Location: service.,
        StartTimezone: "Europe/Warsaw",
        EndTimezone: "Europe/Warsaw",
        IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
      };
    }),
    undefined,
    true
  ) as Data[];
};
