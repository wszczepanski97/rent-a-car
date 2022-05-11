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

export type CarsPageProps = {
  cars: Cars[];
};
