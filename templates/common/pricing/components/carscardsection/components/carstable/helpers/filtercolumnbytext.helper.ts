import { Row } from "react-table";
import { Car } from "types/car/car.type";
import { fuzzyTextFilterFn } from "./fuzzytextfilter.helper";

export const filterColumnByText = () => ({
  fuzzyText: fuzzyTextFilterFn,
  text: (rows: Row<Car>[], id: string, filterValue: string) =>
    rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
        : true;
    }),
});
