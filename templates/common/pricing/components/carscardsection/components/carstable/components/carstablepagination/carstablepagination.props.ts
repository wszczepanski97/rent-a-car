export type CarsTablePaginationProps = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageIndex: number;
  nextPage(): void;
  previousPage(): void;
};
