import { useSession } from "next-auth/react";
import { FC, FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarCard from "ui/molecules/carcard";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import styles from "./rentcard.module.scss";
import { RentCardProps } from "./rentcard.props";
import { RentCardSubmitFormType } from "./rentcardsubmitform.type";

const RentCard: FC<RentCardProps> = ({ car }) => {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [iloscDni, setIloscDni] = useState(0);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RentCardSubmitFormType;
    const [DataOd, DataDo] = target.timeRange.value
      .split("-")
      .map((date) => date.trim());
    const body = JSON.stringify({
      DataOd,
      DataDo,
      Opis: target.Opis.value,
      IloscDni: parseInt(target.IloscDni.value),
      Kwota: parseInt(target.Kwota.value),
      IdUbezpieczenia: parseInt(target.IdUbezpieczenia.value),
      IdUzytkownicy: session?.user.id,
      IdSamochody: car?.IdSamochody,
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const response = await fetch("/api/client/rent", options);
    const result = await response.json();
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setIloscDni(
      !start || !end
        ? 0
        : Math.ceil(
            (new Date(end).getTime() - new Date(start).getTime()) /
              (1000 * 3600 * 24)
          )
    );
  };

  return (
    <Card type={CardType.CUSTOM} className={styles.carCard}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Wybrany model</h3>
        <CarCard
          detailsProps={{
            carBody: car?.samochodyszczegoly.Nadwozie,
            fuelType: car?.samochodyszczegoly.RodzajPaliwa,
            numberOfSeats: car?.samochodyszczegoly.IloscMiejsc,
          }}
          photoProps={{
            src: car?.Zdjecia?.split(";")[0] || "",
            alt: `${car?.Marka} ${car?.Model}`,
          }}
          titleProps={{ title: `${car?.Marka} ${car?.Model}` }}
          withoutBtns
        />
      </div>
      <div className={styles.rentCardFormContainer}>
        <h3 className={styles.rentCardFormTitle}>Wypełnij formularz</h3>
        <form className={styles.rentCardForm} onSubmit={handleSubmit}>
          <div className={styles.rentCardFormField}>
            <label htmlFor="DataOd">Wybierz termin</label>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              minDate={new Date()}
              endDate={endDate}
              selectsRange
              showDisabledMonthNavigation
              id="timeRange"
              name="timeRange"
            />
          </div>
          <div className={styles.rentCardFormField}>
            <label htmlFor="IdUbezpieczenia">Ubezpieczenie</label>
            <select name="IdUbezpieczenia" id="IdUbezpieczenia">
              <option value="13">Pakiet Ochrony Komfort</option>
              <option value="14">Pakiet Ochrony Premium</option>
              <option value="15">Pakiet Ochrony VIP Premium</option>
            </select>
          </div>
          <div className={styles.rentCardFormField}>
            <label htmlFor="Opis">
              Informacja dla wypożyczalni(max 150 słów)
            </label>
            <textarea
              name="Opis"
              id="Opis"
              cols={30}
              rows={5}
              maxLength={150}
              style={{ resize: "none" }}
            />
          </div>
          <div className={styles.rentCardFormField}>
            <label htmlFor="IloscDni">Ilość dni</label>
            <input
              type="number"
              id="IloscDni"
              name="IloscDni"
              required
              disabled
              value={iloscDni}
            />
          </div>
          <div className={styles.rentCardFormField}>
            <label htmlFor="Kwota">Kwota</label>
            <input
              type="number"
              id="Kwota"
              name="Kwota"
              required
              disabled
              value={car ? car.CenaZaGodzine * iloscDni : undefined}
            />
          </div>
          {error && <div>{error}</div>}
          <button type="submit">Zamów</button>
        </form>
      </div>
    </Card>
  );
};

export default RentCard;
