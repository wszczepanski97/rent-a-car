import type { FC } from "react";
import { DefaultColumnFilterProps } from "templates/common/pricing/components/carscardsection/components/carstable/components/defaultcolumnfilter/defaultcolumnfilter.props";

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
