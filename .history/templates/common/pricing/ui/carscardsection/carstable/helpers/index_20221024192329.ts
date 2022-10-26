import { matchSorter } from "match-sorter";
import { Cars } from "templates/common/types";

export const fuzzyTextFilterFn = (
  rows: FilterTypes<Cars>[],
  id: string,
  filterValue: string
) => matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });

fuzzyTextFilterFn.autoRemove = (val: string) => !val;

export const filterColumnByText = () => ({
  fuzzyText: fuzzyTextFilterFn,
  text: (rows: FilterTypes<Cars>[], id: string, filterValue: string) =>
    rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
        : true;
    }),
});
