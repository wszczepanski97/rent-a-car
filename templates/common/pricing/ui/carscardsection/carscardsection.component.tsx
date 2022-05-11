import { FC, useMemo } from "react";
import styles from "./carscardsection.module.scss";
import {
  Column,
  HeaderGroup,
  Row,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Link from "next/link";
import { Photo } from "ui";
import { matchSorter } from "match-sorter";
import { CardButton } from "ui/common/molecules/card/ui";
import { CardButtonType } from "ui/common/molecules/card/ui/atoms/cardbutton/cardbutton.component";
import { Cars } from "templates";

const CarsCardSection: FC<{ cars: Cars[] }> = ({ cars }) => {
  const columns = useMemo<Column<Cars>[]>(
    () => [
      { Header: "", accessor: "IdSamochody" },
      {
        Header: "",
        accessor: "Zdjecie",
        disableFilters: true,
        disableSortBy: true,
      },
      { Header: "Samochód", accessor: "Nazwa" },
      {
        Header: "Cena za dzień",
        accessor: "CenaZaDzien",
        // Filter: SliderColumnFilter,
        // filter: "equals",
        disableFilters: true,
      },
      {
        Header: "Rodzaj paliwa",
        accessor: "RodzajPaliwa",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Nadwozie",
        accessor: "Nadwozie",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Ilość miejsc",
        accessor: "IloscMiejsc",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Ilość drzwi",
        accessor: "IloscDrzwi",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Pojemność bagażnika",
        accessor: "PojemnoscBagaznika",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
    ],
    []
  );

  function fuzzyTextFilterFn(
    rows: Row<Cars>[],
    id: string,
    filterValue: string
  ) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows: Row<Cars>[], id: string, filterValue: string) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
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
    visibleColumns,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: cars,
      defaultColumn,
      //@ts-ignore
      filterTypes,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["IdSamochody"],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <section className={styles.carsCardSection}>
      <table className={styles.PastRentalTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            ></th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className={styles.PastRentalTableRow} {...row.getRowProps()}>
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
                      className={styles.PastRentalTableCell}
                      {...cell.getCellProps()}
                      style={{
                        backgroundColor: isPhotoCell ? "white" : undefined,
                      }}
                    >
                      {isPhotoCell ? (
                        <Link href={`/cars/${row.values.IdSamochody}`}>
                          <Photo
                            src={cell.value}
                            alt="Photo"
                            size={{ height: "80", width: "80" }}
                          />
                        </Link>
                      ) : isSamochodCell ? (
                        <Link href={`/cars/${row.values.IdSamochody}`}>
                          {cell.row.values.Samochod}
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
                <td>
                  <CardButton
                    type={CardButtonType.CardButtonWithBG}
                    buttonText="Wypożycz"
                    bgColor="var(--primary-color)"
                    color="var(--light-text-color)"
                    href={`/client/rent/${row.values.IdSamochody}`}
                  />
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
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
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
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </section>
  );
};

type ColumnGroup = HeaderGroup<Cars>;
function DefaultColumnFilter(column: ColumnGroup) {
  const count = column.preFilteredRows.length;

  return (
    <input
      value={column.filterValue || ""}
      onChange={(e) => {
        column.setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter(column: ColumnGroup) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    column.preFilteredRows.forEach((row) => {
      options.add(row.values[column.id]);
    });
    //@ts-ignore
    return [...options.values()];
  }, [column.id, column.preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={column.filterValue}
      onChange={(e) => {
        column.setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// function SliderColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the min and max
//   // using the preFilteredRows
//   const [min, max] = useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     preFilteredRows.forEach((row) => {
//       min = Math.min(row.values[id], min);
//       max = Math.max(row.values[id], max);
//     });
//     return [min, max];
//   }, [id, preFilteredRows]);

//   console.log(
//     Array.from(new Set(preFilteredRows.map((row) => row.values[id])))
//   );
//   console.log(preFilteredRows);
//   return (
//     <>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={filterValue || min}
//         list="tickmarks"
//         onChange={(e) => {
//           setFilter(parseInt(e.target.value, 10));
//         }}
//       />
//       <datalist id="tickmarks">
//         {Array.from(new Set(preFilteredRows.map((row) => row.values[id]))).map(
//           (price) => (
//             <option value={price} label={`${price}%`}></option>
//           )
//         )}
//       </datalist>
//     </>
//   );
// }

export default CarsCardSection;
