import { FC, useMemo } from "react";
import { HeaderGroup } from "react-table";
import { Cars } from "templates/common/types";

type SelectColumnFilterProps = {
  column: HeaderGroup<Cars>;
};

export const SelectColumnFilter: FC<SelectColumnFilterProps> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(
    () =>
      Array.from(
        new Set([...preFilteredRows.map((row) => row.values[id])]).values()
      ),
    [id, preFilteredRows]
  );
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Wszystkie</option>
      {options.sort().map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
