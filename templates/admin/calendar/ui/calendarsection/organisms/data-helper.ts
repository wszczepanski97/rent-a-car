import { Service } from "pages/coordinator/calendar";
import { extend } from "@syncfusion/ej2-base";

const getNameOfService = (service: Service) =>
  !!service.wypozyczenia.length
    ? "Wypożyczenie"
    : !!service.uszkodzenia.length
    ? "Uszkodzenie"
    : !!service.mycie.length
    ? "Mycie"
    : "Relokacja";

export const getData = (services: Service[]) =>
  extend(
    [],
    services!.map((service) => ({
      Id: service.IdUslugi,
      Subject: `${getNameOfService(service)} ${service.samochody.Marka} ${
        service.samochody.Model
      }`,
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
      Type: getNameOfService(service),
      AssignedWorker: service.IdPracownicy_Przypisanie,
      StartTimezone: "Europe/Warsaw",
      EndTimezone: "Europe/Warsaw",
      IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
    })),
    undefined,
    true
  ) as Record<string, any>[];
