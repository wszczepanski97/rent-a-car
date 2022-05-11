import Link from "next/link";
import { useRouter } from "next/router";
import { FutureRental } from "pages/client/myrentals";
import React, { FC, useCallback, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  Column,
} from "react-table";
import { FutureRentalSectionProps } from "templates/client/myrentals/ui/futurerentalsection/futurerentalsection.component";
import { Photo } from "ui";
import styles from "./futurerentaltable.module.scss";

const FutureRentalTable: FC<FutureRentalSectionProps> = ({ rentals }) => {
  const router = useRouter();
  const columns = useMemo<Column<FutureRental>[]>(
    () => [
      { Header: "", accessor: "IdSamochod" },
      { Header: "", accessor: "IdUslugi" },
      { Header: "", accessor: "IdWypozyczenia" },
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
        hiddenColumns: ["IdSamochod", "IdUslugi", "IdWypozyczenia"],
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
        className={styles.FutureRentalSearch}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Wyszukaj po właściwości...`}
      />
      <table className={styles.FutureRentalTable} {...getTableProps()}>
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
              <tr
                className={styles.FutureRentalTableRow}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
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
                      className={styles.FutureRentalTableCell}
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
                <td>
                  <button
                    className={styles.DeleteRentButton}
                    onClick={async () => {
                      const response = await fetch(`/api/client/rent`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          IdWypozyczenia: row.values.IdWypozyczenia,
                          IdUslugi: row.values.IdUslugi,
                        }),
                      });
                      router.replace("/client/myrentals");
                      return await response.json();
                    }}
                  >
                    Usuń wypożyczenie
                  </button>
                </td>
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

export default FutureRentalTable;
