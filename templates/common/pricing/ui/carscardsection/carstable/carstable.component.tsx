import { useContext, useMemo } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import { PricingPageContext } from "../../../contexts";
import { carsTableColumns } from "./constants";
import { filterColumnByText } from "./helpers";
import styles from "./carstable.module.scss";
import {
  CarsTableBody,
  CarsTableHeader,
  CarsTablePagination,
  CarsTableContainer,
  DefaultColumnFilter,
} from "./components";

const CarsTable = () => {
  const data = useContext(PricingPageContext);
  const columns = useMemo(() => carsTableColumns, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const filterTypes = useMemo(filterColumnByText, []);

  const {
    getTableProps,
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
      data,
      defaultColumn,
      //@ts-ignore
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 6,
        hiddenColumns: ["IdSamochody"],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <article className={styles.carsCard_Container}>
      <CarsTableContainer {...getTableProps()}>
        <CarsTableHeader headerGroups={headerGroups} />
        <CarsTableBody page={page} prepareRow={prepareRow} />
      </CarsTableContainer>
      <CarsTablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={pageIndex}
      />
    </article>
  );
};

export default CarsTable;
