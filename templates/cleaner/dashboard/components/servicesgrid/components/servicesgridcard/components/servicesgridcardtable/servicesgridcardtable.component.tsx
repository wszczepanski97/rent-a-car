import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useMemo } from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useWash } from "templates/cleaner/dashboard/swr/useWash.swr";
import { Service } from "templates/cleaner/dashboard/types";
import Photo from "ui/atoms/photo";
import Button from "../../../../cards/currentservicegridcard/components/button";
import ServicesGridCardInfo from "../servicesgridcardinfo/servicesgridcardinfo.component";
import styles from "./servicesgridcardtable.module.scss";

export type ServicesGridCardTableProps = {
  dataProp: string;
  rowsPerPage: number;
  statement: string;
  withButtonsFuture?: boolean;
  withButtonsAvailable?: boolean;
};

const ServicesGridCardTable: FC<ServicesGridCardTableProps> = ({
  dataProp,
  rowsPerPage,
  statement,
  withButtonsFuture = false,
  withButtonsAvailable = false,
}) => {
  const { data: session } = useSession();
  const { data: serviceData, isError, isLoading, mutate } = useWash();
  const columns = useMemo<Column<Service>[]>(
    () => [
      { Header: "Nr mycia", accessor: `IdMycie` },
      { Header: "", accessor: "IdUslugi" },
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
      data: serviceData[dataProp] as Service[],
      initialState: {
        hiddenColumns: ["IdSamochod", "IdUslugi"],
        pageIndex: 0,
        pageSize: rowsPerPage || 3,
        sortBy: [
          {
            id: "DataDo",
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (isLoading) return <div>Trwa ładowanie...</div>;
  if (isError) return <div>Błąd...</div>;
  if (serviceData[dataProp].length === 0)
    return <ServicesGridCardInfo statement={statement} />;

  const handleWash = async (
    type: string,
    IdUslugi?: string,
    IdUszkodzenia?: string
  ) => {
    await fetch(`/api/wash`, {
      method: type === "DELETE" ? "DELETE" : "PUT",
      headers: { "Content-Type": "application/json" },
      body:
        type === "DELETE"
          ? JSON.stringify({
              IdUszkodzenia,
              IdUslugi,
            })
          : type === "UNASSIGN"
          ? JSON.stringify({
              IdUslugi,
              type,
            })
          : JSON.stringify({
              IdUslugi,
              IdUzytkownicy: session?.user.id,
              type,
            }),
    });
    mutate();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
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
                {(withButtonsFuture || withButtonsAvailable) && (
                  <td>
                    {withButtonsAvailable && (
                      <Button
                        bgColor="green"
                        onClick={async () =>
                          await handleWash(
                            "ASSIGN",
                            row.values.IdUslugi,
                            undefined
                          )
                        }
                        text="Podejmij"
                      />
                    )}
                    {withButtonsFuture && (
                      <Button
                        bgColor="var(--login-button-background)"
                        onClick={async () =>
                          await handleWash(
                            "UNASSIGN",
                            row.values.IdUslugi,
                            row.values.IdUszkodzenia
                          )
                        }
                        text="Odepnij"
                      />
                    )}
                    <Button
                      bgColor="red"
                      onClick={async () =>
                        await handleWash(
                          "DELETE",
                          row.values.IdUslugi,
                          row.values.IdUszkodzenia
                        )
                      }
                      text="Anuluj"
                    />
                  </td>
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
    </div>
  );
};

export default ServicesGridCardTable;
