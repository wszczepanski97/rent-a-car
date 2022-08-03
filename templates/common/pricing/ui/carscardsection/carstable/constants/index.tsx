import { Column } from "react-table";
import { Cars } from "templates/client";
import { SelectColumnFilter } from "../components/selectcolumnfilter/SelectColumnFilter";

export const carsTableColumns: Column<Cars>[] = [
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
    accessor: "CenaZaDzien",
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
