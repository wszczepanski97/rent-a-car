import { matchSorter } from "match-sorter";
import { Row } from "react-table";
import { Car } from "types/car/car.type";

export const fuzzyTextFilterFn = (
  rows: Row<Car>[],
  id: string,
  filterValue: string
) => matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });

fuzzyTextFilterFn.autoRemove = (val: string) => !val;
