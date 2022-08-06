import { FC } from "react";
import { HeaderGroup } from "react-table";
import { Cars } from "templates/common/types";

type DefaultColumnFilterProps = {
  column: HeaderGroup<Cars>;
};

export const DefaultColumnFilter: FC<DefaultColumnFilterProps> = ({
  column: { filterValue, setFilter },
}) => (
  <input
    value={filterValue || ""}
    onChange={(e) => {
      setFilter(e.target.value || undefined);
    }}
    placeholder={`Wyszukaj po nazwie...`}
  />
);

export default DefaultColumnFilter;
