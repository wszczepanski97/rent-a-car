import { FC } from "react";
import { HeaderGroup } from "react-table";
import { Cars } from "templates/common/types";
import styles from "../../carstable.module.scss";

const CarsTableHeader: FC<{ headerGroups: HeaderGroup<Cars>[] }> = ({
  headerGroups,
}) => {
  return (
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
};

export default CarsTableHeader;
