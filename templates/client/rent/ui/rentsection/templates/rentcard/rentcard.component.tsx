import { Session } from "next-auth";
import { FC, FormEventHandler, useCallback, useRef, useState } from "react";
import { Car } from "templates/client";
import { CarCard, Card, CardType } from "ui";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./rentcard.module.scss";

type RentCardProps = {
  car: Car;
  session: Session | null;
};

type SubmitFormType = {
  timeRange: { value: string };
  Opis: { value: string };
  IloscDni: { value: string };
  Kwota: { value: string };
  IdUbezpieczenia: { value: string };
};

const RentCard: FC<RentCardProps> = ({ car, session }) => {
  const [error, setError] = useState("");
  const [iloscDni, setIloscDni] = useState(0);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & SubmitFormType;
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
      IdSamochody: car!.IdSamochody,
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
            carBody: car!.samochodyszczegoly.Nadwozie,
            fuelType: car!.samochodyszczegoly.RodzajPaliwa,
            numberOfSeats: car!.samochodyszczegoly.IloscMiejsc,
          }}
          photoProps={{
            src: car!.Zdjecia?.split(";")[0] || "",
            alt: `${car!.Marka} ${car!.Model}`,
          }}
          titleProps={{ title: `${car!.Marka} ${car!.Model}` }}
          withoutBtns
        />
      </div>
      <div className={styles.rentCardFormContainer}>
        <h3 className={styles.rentCardFormTitle}>Wype??nij formularz</h3>
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
              Informacja dla wypo??yczalni(max 150 s????w)
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
            <label htmlFor="IloscDni">Ilo??????dni</label>
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
              value={car!.CenaZaDzien * iloscDni}
            />
          </div>
          {error && <div>{error}</div>}
          <button type="submit">Zam??w</button>
        </form>
      </div>
    </Card>
  );
};

export default RentCard;
