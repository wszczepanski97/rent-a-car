import { CarContext } from "contexts/car.context";
import { useContext, useMemo } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import styles from "./carstable.module.scss";
import CarsTableBody from "./components/carstablebody";
import CarsTableContainer from "./components/carstablecontainer";
import CarsTableHeader from "./components/carstableheader";
import CarsTablePagination from "./components/carstablepagination";
import DefaultColumnFilter from "./components/defaultcolumnfilter";
import { carsTableColumns } from "./constants/carstablecolumns.constant";
import { filterColumnByText } from "./helpers/filtercolumnbytext.helper";

const CarsTable = () => {
  const data = useContext(CarContext);
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
        pageSize: 4,
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
