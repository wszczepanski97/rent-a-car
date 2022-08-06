import Link from "next/link";
import React, { FC } from "react";
import { Row } from "react-table";
import { Cars } from "templates/common/types";
import { Photo } from "ui";
import CardButton, {
  CardButtonType,
} from "ui/common/molecules/card/ui/atoms/cardbutton/cardbutton.component";
import styles from "../../carstable.module.scss";

type CarsTableBodyProps = {
  page: Row<Cars>[];
  prepareRow(row: Row<Cars>): void;
};

const CarsTableBody: FC<CarsTableBodyProps> = ({ page, prepareRow }) => {
  return (
    <>
      {page.map((row) => {
        prepareRow(row);
        return (
          <tr className={styles.carsCard_Table_Row} {...row.getRowProps()}>
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
                  className={styles.carsCard_Table_Row_Cell}
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
    </>
  );
};

export default CarsTableBody;
