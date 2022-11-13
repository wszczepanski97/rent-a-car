import Link from "next/link";
import { Service } from "pages/mechanic/dashboard";
import { FC, useMemo } from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ServicesSectionProps } from "templates/common/services/ui/servicessection/servicessection.component";
import Photo from "ui/atoms/photo";
import styles from "./servicestable.module.scss";

type ServicesTableProps = Pick<
  ServicesSectionProps,
  "services" | "actionsbuttons" | "rowsPerPage"
>;

const ServicesTable: FC<ServicesTableProps> = ({
  services,
  actionsbuttons,
  rowsPerPage,
}) => {
  const columns = useMemo<Column<Service>[]>(
    () => [
      { Header: "Numer naprawy", accessor: `IdUszkodzenia` },
      { Header: "", accessor: "IdSamochod" },
      {
        Header: "Data od",
        accessor: "DataOd",
        Cell: (column) => new Date(column.value).toLocaleString(),
      },
      {
        Header: "Data do",
        accessor: "DataDo",
        Cell: (column) => new Date(column.value).toLocaleString(),
      },
      {
        Header: "Samochód",
        accessor: "Samochod",
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
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: (services || []) as Service[],
      initialState: {
        pageIndex: 0,
        pageSize: rowsPerPage || 3,
        hiddenColumns: ["IdSamochod"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleRepairCancelation = async (IdUszkodzenia: string) => {
    await fetch("/api/repair", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdUszkodzenia }),
    });
  };

  return (
    <>
      <table className={styles.servicesTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className={styles.servicesTableHeadingRow}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ textAlign: "center" }}
                >
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
              <tr className={styles.servicesTableRow} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const isSamochodCell = cell
                    .getCellProps()
                    .key.toString()
                    .includes("Samochod");

                  return (
                    <td
                      className={styles.servicesTableCell}
                      {...cell.getCellProps()}
                    >
                      {isSamochodCell ? (
                        <Link href={`/car/${row.values.IdSamochod}`}>
                          {cell.row.values.Samochod}
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
                {actionsbuttons && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <button>Edytuj</button>
                    <button
                      onClick={() =>
                        handleRepairCancelation(row.values.IdUszkodzenia)
                      }
                    >
                      Anuluj
                    </button>
                  </div>
                )}
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
        </button>
      </div>
    </>
  );
};

export default ServicesTable;
