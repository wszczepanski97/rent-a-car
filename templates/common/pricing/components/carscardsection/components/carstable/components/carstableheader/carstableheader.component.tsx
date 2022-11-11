import type { FC } from "react";
import { CarsTableHeaderProps } from "templates/common/pricing/components/carscardsection/components/carstable/components/carstableheader/carstableheader.props";
import styles from "../../carstable.module.scss";

const CarsTableHeader: FC<CarsTableHeaderProps> = ({ headerGroups }) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th className={styles.carsCard_Table_Heading}>
            <span {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
            </span>
            <span>
              {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
            </span>
            <div>{column.canFilter ? column.render("Filter") : null}</div>
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default CarsTableHeader;
