export type Rental = {
  IdWypozyczenia: number;
  IdUslugi: number;
  DataDo: string;
  DataOd: string;
  Kwota: number;
  Samochod: string;
  IdSamochod: number;
  CenaZaGodzine: number;
  Zdjecie: string | undefined;
};
