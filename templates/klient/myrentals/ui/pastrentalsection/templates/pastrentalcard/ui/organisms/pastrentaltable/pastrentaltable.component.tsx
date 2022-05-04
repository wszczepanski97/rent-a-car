import { MyRentalsPageProps } from "pages/klient/myrentals";
import React, { FC, useMemo } from "react";

import { useTable, useSortBy } from "react-table";

const PastRentalTable: FC<MyRentalsPageProps> = ({ rentals }) => {
  console.log(rentals);
  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "Id" },
      { Header: "Car", accessor: "Samochod" },
      {
        Header: "Date From",
        accessor: "DataOd",
      },
      {
        Header: "Date To",
        accessor: "DataDo",
      },
      {
        Header: "Price",
        accessor: "Kwota",
      },
      { Header: "Price for day", accessor: "CenaZaDzien" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: rentals,
      },
      useSortBy
    );

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}{" "}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PastRentalTable;
