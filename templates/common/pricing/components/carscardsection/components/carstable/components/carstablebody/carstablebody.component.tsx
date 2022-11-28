import Link from "next/link";
import type { FC } from "react";
import Photo from "ui/atoms/photo";
import CardButton from "ui/molecules/card/components/cardbutton/cardbutton.component";
import { CardButtonType } from "ui/molecules/card/components/cardbutton/cardbuttontype.enum";
import styles from "../../carstable.module.scss";
import { CarsTableBodyProps } from "./carstablebody.props";

const CarsTableBody: FC<CarsTableBodyProps> = ({ page, prepareRow }) => (
  <>
    {page.map((row, index) => {
      prepareRow(row);
      return (
        <tr
          className={styles.carsCard_Table_Row}
          key={`row-${index}`}
          {...row.getRowProps}
        >
          {row.cells.map((cell, index) => {
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
                key={`cell-${index}`}
                style={{
                  backgroundColor: isPhotoCell ? "white" : undefined,
                  paddingLeft: isPhotoCell ? "10px" : undefined,
                  borderRadius: isPhotoCell ? "10px" : undefined,
                }}
              >
                {isPhotoCell ? (
                  <Link href={`/car/${row.values.IdSamochody}`}>
                    <Photo
                      src={cell.value}
                      alt="Photo"
                      size={{ height: "80", width: "80" }}
                    />
                  </Link>
                ) : isSamochodCell ? (
                  <Link href={`/car/${row.values.IdSamochody}`}>
                    {cell.row.values.Samochod}
                  </Link>
                ) : (
                  cell.render("Cell")
                )}
              </td>
            );
          })}
          <td
            className={styles.carsCard_Table_Row_Cell}
            style={{ borderRadius: "0 10px 10px 0" }}
          >
            <CardButton
              type={CardButtonType.CardButtonWithBG}
              buttonText="Wypożycz"
              bgColor="var(--primary-color)"
              color="var(--light-text-color)"
              href={`/client/rent/${row.values.IdSamochody}`}
              style={{ height: "100%" }}
            />
          </td>
        </tr>
      );
    })}
  </>
);

export default CarsTableBody;
