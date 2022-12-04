import { wyplaty } from "@prisma/client";
import { FC, useMemo } from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useRepair } from "templates/mechanic/dashboard/swr/useRepair.swr";
import Photo from "ui/atoms/photo";
import ServicesGridCardInfo from "../../../../components/servicesgridcard/components/servicesgridcardinfo/servicesgridcardinfo.component";
import styles from "./paychecksgridcardtable.module.scss";

const PaychecksGridCardTable: FC<{ statement: string }> = ({ statement }) => {
  const { data, isError, isLoading } = useRepair();
  const columns = useMemo<Column<wyplaty>[]>(
    () => [
      { Header: "", accessor: "IdWyplaty" },
      { Header: "Kwota", accessor: "Kwota" },
      {
        Header: "Data od",
        accessor: "OdKiedy",
        Cell: (column) => new Date(column.value).toLocaleDateString(),
      },
      {
        Header: "Data do",
        accessor: "DoKiedy",
        Cell: (column) => new Date(column.value!).toLocaleDateString(),
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
      data: data.paychecks || [],
      initialState: {
        pageIndex: 0,
        pageSize: 2,
        hiddenColumns: ["IdWyplaty"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (isLoading) return <div>Trwa ładowanie...</div>;
  if (isError) return <div>Błąd...</div>;
  if (data.paychecks === null)
    return <ServicesGridCardInfo statement={statement} />;

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
      <table className={styles.paychecksTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.paychecksTableHeader}
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
              <tr className={styles.paychecksTableRow} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={styles.paychecksTableCell}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
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
    </div>
  );
};

export default PaychecksGridCardTable;
