import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNextHalfHourDateForToday } from "templates/coordinator/calendar/ui/calendarsection/organisms/tabs/helpers/date-helper";
import CarCard from "ui/molecules/carcard";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import styles from "./rentcard.module.scss";
import { RentCardProps } from "./rentcard.props";
import { RentCardSubmitFormType } from "./rentcardsubmitform.type";

const RentCard: FC<RentCardProps> = ({ car }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
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

  const [startDate, setStartDate] = useState<Date | null>(
    getNextHalfHourDateForToday(new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(null);
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Card type={CardType.CUSTOM} className={styles.carCard}>
      <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>
        Wypożycz auto
      </h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
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
              <div style={{ display: "flex", width: "100%", gap: 30 }}>
                <div>
                  <label htmlFor="DataOd">Data od</label>
                  <DatePicker
                    id="timeRangeStart"
                    name="timeRangeStart"
                    dateFormat="dd/MM/yyyy, h:mm aa"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    filterTime={filterPassedTime}
                    selectsStart
                    showTimeSelect
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
                <div>
                  <label htmlFor="DataDo">Data do</label>
                  <DatePicker
                    id="timeRangeEnd"
                    name="timeRangeEnd"
                    dateFormat="dd/MM/yyyy, h:mm aa"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    filterTime={filterPassedTime}
                    selectsEnd
                    showTimeSelect
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rentCardFormField}>
              <label htmlFor="IdUbezpieczenia">Ubezpieczenie</label>
              <select
                name="IdUbezpieczenia"
                id="IdUbezpieczenia"
                style={{ height: 32 }}
              >
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
            {/* <div className={styles.rentCardFormField}>
              <label htmlFor="IloscDni">Ilość dni</label>
              <input
                type="number"
                id="IloscDni"
                name="IloscDni"
                required
                disabled
                value={iloscDni}
              />
            </div> */}
            {/* <div className={styles.rentCardFormField}>
              <label htmlFor="Kwota">Kwota</label>
              <input
                type="number"
                id="Kwota"
                name="Kwota"
                required
                disabled
                value={car ? car.CenaZaGodzine * iloscDni : undefined}
              />
            </div> */}
            {error && <div>{error}</div>}
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #71b7e6, #9b59b6)",
                borderRadius: 5,
                color: "var(--light-text-color)",
                width: 300,
                height: 40,
                cursor: "pointer",
                margin: "0 auto",
              }}
            >
              Zamów
            </button>
          </form>
        </div>
      </div>
      <button
        onClick={() => {
          router.push("/client/rent");
        }}
        style={{
          background: "linear-gradient(135deg, #e67171, #80419a)",
          borderRadius: 5,
          color: "var(--light-text-color)",
          width: 300,
          height: 40,
          cursor: "pointer",
          margin: "0 auto",
        }}
      >
        Wróć do listy samochodów
      </button>
    </Card>
  );
};

export default RentCard;
