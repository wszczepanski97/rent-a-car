import { Column } from "react-table";
import { Car } from "types/car/car.type";
import SelectColumnFilter from "../components/selectcolumnfilter/selectcolumnfilter.component";

export const carsTableColumns: Column<Car>[] = [
  { Header: "", accessor: "IdSamochody" },
  {
    Header: "",
    accessor: "Zdjecie",
    disableFilters: true,
    disableSortBy: true,
  },
  { Header: "Samochód", accessor: "Nazwa" },
  {
    Header: "Cena za dzień",
    accessor: "CenaZaGodzine",
    // Filter: SliderColumnFilter,
    // filter: "equals",
    disableFilters: true,
  },
  {
    Header: "Rodzaj paliwa",
    accessor: "RodzajPaliwa",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Nadwozie",
    accessor: "Nadwozie",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Ilość miejsc",
    accessor: "IloscMiejsc",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Ilość drzwi",
    accessor: "IloscDrzwi",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Pojemność bagażnika",
    accessor: "PojemnoscBagaznika",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
];
