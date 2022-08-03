import React, { FC } from "react";
import { Photo } from "ui";
import styles from "../../carstable.module.scss";

type CarsTablePaginationProps = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageIndex: number;
  nextPage(): void;
  previousPage(): void;
};

const CarsTablePagination: FC<CarsTablePaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageIndex,
  nextPage,
  previousPage,
}) => (
  <div className={styles.carsCard_Pagination}>
    <button
      className={styles.carsCard_Pagination_Button}
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
      Strona{" "}
      <strong>
        {pageIndex + 1} z {pageOptions.length}
      </strong>
    </span>
    <button
      className={styles.carsCard_Pagination_Button}
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
);

export default CarsTablePagination;
