export type DashboardPageCars = {
  RodzajPaliwa: string;
  Nadwozie: string;
  PojemnoscBagaznika: string;
  IloscDrzwi: string;
  IloscMiejsc: string;
  CenaZaDzien: number;
  IdSamochody: number;
  Marka: string;
  Model: string;
  Zdjecia: string | null;
};

export type DashboardPageProps = {
  cars: DashboardPageCars[];
};
