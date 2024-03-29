import Link from "next/link";
import { FC, useCallback, useMemo, useState } from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { RentalSectionProps } from "templates/client/myrentals/components/rentalsection/rentalsection.props";
import { Rental } from "types/rental/rental.type";
import Photo from "ui/atoms/photo";
import styles from "./rentaltable.module.scss";

const RentalTable: FC<
  Pick<
    RentalSectionProps,
    "rentals" | "past" | "setModalOpen" | "setDeleteRentDetails"
  >
> = ({ rentals, past, setModalOpen, setDeleteRentDetails }) => {
  const columns = useMemo<Column<Rental>[]>(
    () => [
      { Header: "", accessor: "IdSamochod" },
      { Header: "", accessor: "IdUslugi" },
      { Header: "", accessor: "IdWypozyczenia" },
      { Header: "", accessor: "Zdjecie" },
      { Header: "Samochód", accessor: "Samochod" },
      {
        Header: "Data od",
        accessor: "DataOd",
        sortType: (a: any, b: any) => {
          var a1 = new Date(
            new Date(a.values.DataOd).toLocaleDateString()
          ).getTime();
          var b1 = new Date(
            new Date(b.values.DataOd).toLocaleDateString()
          ).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
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
        Header: "Cena",
        accessor: "CenaZaGodzine",
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
        pageSize: 4,
        hiddenColumns: ["IdSamochod", "IdUslugi", "IdWypozyczenia"],
        sortBy:
          past === true
            ? []
            : [
                {
                  id: "DataOd",
                  desc: true,
                },
              ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [value, setValue] = useState(globalFilter);
  const onChange = useCallback(
    (value) => {
      setGlobalFilter(value || undefined);
    },
    [setGlobalFilter]
  );

  return (
    <>
      <input
        className={styles.rentalSearch}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Wyszukaj po właściwości...`}
      />
      <table className={styles.rentalTable} {...getTableProps()}>
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
              <tr className={styles.rentalTableRow} {...row.getRowProps()}>
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
                      className={styles.rentalTableCell}
                      {...cell.getCellProps()}
                      style={{
                        backgroundColor: isPhotoCell ? "white" : undefined,
                      }}
                    >
                      {isPhotoCell ? (
                        <Link href={`/car/${row.values.IdSamochod}`}>
                          <Photo
                            src={cell.value}
                            alt="Photo"
                            size={{ height: "60", width: "60" }}
                          />
                        </Link>
                      ) : isSamochodCell ? (
                        <Link href={`/car/${row.values.IdSamochod}`}>
                          {cell.row.values.Samochod}
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
                {!past && (
                  <td style={{ textAlign: "right" }}>
                    <button
                      className={styles.deleteRentButton}
                      onClick={() => {
                        setModalOpen(true);
                        setDeleteRentDetails?.({
                          IdWypozyczenia: row.values.IdWypozyczenia,
                          IdUslugi: row.values.IdUslugi,
                        });
                      }}
                    >
                      Usuń wypożyczenie
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
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
          className={styles.paginationButton}
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

export default RentalTable;
