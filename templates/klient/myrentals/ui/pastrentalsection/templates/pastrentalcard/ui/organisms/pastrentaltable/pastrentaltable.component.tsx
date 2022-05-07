import Link from "next/link";
import { ClientRental, MyRentalsPageProps } from "pages/klient/myrentals";
import React, { FC, useCallback, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  Column,
} from "react-table";
import { Photo } from "ui";
import styles from "./pastrentaltable.module.scss";

const PastRentalTable: FC<MyRentalsPageProps> = ({ rentals }) => {
  const columns = useMemo<Column<ClientRental>[]>(
    () => [
      { Header: "", accessor: "IdSamochod" },
      { Header: "", accessor: "Zdjecie" },
      { Header: "Samochód", accessor: "Samochod" },
      {
        Header: "Data od",
        accessor: "DataOd",
      },
      {
        Header: "Data do",
        accessor: "DataDo",
      },
      {
        Header: "Kwota",
        accessor: "Kwota",
      },
      {
        Header: "Cena za dzień",
        accessor: "CenaZaDzien",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data: rentals,
      initialState: {
        pageIndex: 0,
        pageSize: 3,
        hiddenColumns: ["IdSamochod"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [value, setValue] = useState(globalFilter);
  const onChange = useCallback((value) => {
    setGlobalFilter(value || undefined);
  }, []);

  return (
    <>
      <input
        className={styles.PastRentalSearch}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Wyszukaj po właściwości...`}
      />
      <table className={styles.PastRentalTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className={styles.PastRentalTableRow} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell);
                  const isPhotoCell = cell
                    .getCellProps()
                    .key.toString()
                    .includes("Zdjecie");
                  const isSamochodCell = cell
                    .getCellProps()
                    .key.toString()
                    .includes("Samochod");
                  return (
                    <td
                      className={styles.PastRentalTableCell}
                      {...cell.getCellProps()}
                      style={{
                        backgroundColor: isPhotoCell ? "white" : undefined,
                      }}
                    >
                      {isPhotoCell ? (
                        <Link href={`/cars/${row.values.IdSamochod}`}>
                          <Photo
                            src={cell.value}
                            alt="Photo"
                            size={{ height: "80", width: "80" }}
                          />
                        </Link>
                      ) : isSamochodCell ? (
                        <Link href={`/cars/${row.values.IdSamochod}`}>
                          {cell.row.values.Samochod}
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.Pagination}>
        <button
          className={styles.PaginationButton}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <Photo
            src="/images/ArrowLeft.png"
            alt="Arrow Left"
            size={{ height: "24", width: "24" }}
          />
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className={styles.PaginationButton}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <Photo
            src="/images/ArrowRight.png"
            alt="Arrow Right"
            size={{ height: "24", width: "24" }}
          />
        </button>{" "}
      </div>
    </>
  );
};

export default PastRentalTable;
