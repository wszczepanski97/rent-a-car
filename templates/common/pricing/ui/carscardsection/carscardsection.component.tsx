import { FC, useEffect, useState } from "react";
import { Cars } from "templates/common";
import { CarCard } from "ui";
import { CarsCardSectionContainer } from "./organisms";
import ReactPaginate from "react-paginate";
import styles from "./carscardsection.module.scss";

const CarsCardSection: FC<{ cars: Cars[] }> = ({ cars }) => {
  const ITEMS_PER_PAGE = 3;
  const [currentItems, setCurrentItems] = useState<Cars[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(cars.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cars.length / ITEMS_PER_PAGE));
  }, [itemOffset, ITEMS_PER_PAGE]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * ITEMS_PER_PAGE) % cars.length;
    setItemOffset(newOffset);
  };

  return (
    <section className={styles.carsCardSection}>
      <CarsCardSectionContainer>
        {currentItems.map(
          ({
            CenaZaDzien,
            IdSamochody,
            IloscMiejsc,
            Marka,
            Model,
            Nadwozie,
            RodzajPaliwa,
            Zdjecia,
          }) => (
            <>
              <CarCard
                detailsProps={{
                  carBody: Nadwozie,
                  fuelType: RodzajPaliwa,
                  numberOfSeats: IloscMiejsc,
                }}
                photoProps={{
                  src: Zdjecia?.split(";")[0] || "",
                  alt: `${Marka} ${Model}`,
                }}
                paragraphProps={{
                  paragraphText: `Price: ${CenaZaDzien}`,
                }}
                titleProps={{ title: `${Marka} ${Model}` }}
                carId={IdSamochody}
              />
            </>
          )
        )}
      </CarsCardSectionContainer>
      <ReactPaginate
        className={styles.Pagination}
        pageLinkClassName={styles.PaginationLink}
        breakLabel="..."
        nextLabel="NASTĘPNA"
        onPageChange={handlePageClick}
        pageRangeDisplayed={ITEMS_PER_PAGE}
        pageCount={pageCount}
        previousLabel="POPRZEDNIA"
        renderOnZeroPageCount={undefined}
      />
    </section>
  );
};

export default CarsCardSection;
