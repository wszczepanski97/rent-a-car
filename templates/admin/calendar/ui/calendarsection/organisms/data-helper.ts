import { Service } from "pages/coordinator/calendar";
import { extend } from "@syncfusion/ej2-base";

const getNameOfService = (service: Service) =>
  !!service.wypozyczenia.length
    ? "Wypożyczenie"
    : !!service.uszkodzenia.length
    ? "Uszkodzenie"
    : "Mycie";

export const getData = (services: Service[]) =>
  extend(
    [],
    services!.map((service) => ({
      Id: service.IdUslugi,
      Subject: `${getNameOfService(service)} ${service.samochody.Marka} ${
        service.samochody.Model
      }`,
      Location: `${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.Miejscowosc}, ${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.Ulica} ${service?.lokalizacje_lokalizacjeTouslugi_IdLokalizacje_Podstawienie.NumerUlicy}`,
      StartTime: service.DataOd,
      EndTime: service.DataDo,
      Description: service.Opis,
      Type: getNameOfService(service),
      OwnerId: service.IdPracownicy_Przypisanie,
      PickerId: service.IdPracownicy_Podstawienie,
      ReturnerId: service.IdPracownicy_Odbior,
      IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
    })),
    undefined,
    true
  ) as Record<string, any>[];
