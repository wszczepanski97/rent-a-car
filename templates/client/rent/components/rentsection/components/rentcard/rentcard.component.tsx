import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEventHandler, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarDescriptionRowProperty from "templates/common/car/components/cardetailssection/components/cardescription/components/cardescriptionrowproperty/cardescriptionrowproperty.component";
import { CarDescriptionRowPropertyEnum } from "templates/common/car/components/cardetailssection/components/cardescription/components/cardescriptionrowproperty/cardescriptionrowproperty.enum";
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
    const body = JSON.stringify({
      DataOd: target.DataOd.value,
      DataDo: target.DataDo.value,
      Opis: target.Opis.value,
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

  const timeRangeStartMinDate = useMemo(
    () => getNextHalfHourDateForToday(new Date()),
    []
  );
  const timeRangeEndMinDate = useMemo(
    () => getNextHalfHourDateForToday(timeRangeStartMinDate),
    [timeRangeStartMinDate]
  );

  const filterPassedTimeStartMinDate = (time: any) =>
    new Date(time).getTime() >= timeRangeStartMinDate.getTime();

  const filterPassedTimeEndMinDate = (time: any) =>
    new Date(time).getTime() >= timeRangeEndMinDate.getTime();

  const [startDate, setStartDate] = useState<Date>(timeRangeStartMinDate);
  const [endDate, setEndDate] = useState<Date>(timeRangeEndMinDate);

  return (
    <Card
      type={CardType.CUSTOM}
      className={styles.carCard}
      style={{ width: "100%" }}
    >
      <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>
        Wypożycz auto
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          minHeight: 450,
        }}
      >
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
                    id="DataOd"
                    name="DataOd"
                    dateFormat="dd/MM/yyyy, h:mm aa"
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    filterTime={filterPassedTimeStartMinDate}
                    selectsStart
                    showTimeSelect
                    startDate={startDate}
                    endDate={endDate}
                    minDate={timeRangeStartMinDate}
                  />
                </div>
                <div>
                  <label htmlFor="DataDo">Data do</label>
                  <DatePicker
                    id="DataDo"
                    name="DataDo"
                    dateFormat="dd/MM/yyyy, h:mm aa"
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    filterTime={filterPassedTimeEndMinDate}
                    selectsEnd
                    showTimeSelect
                    startDate={startDate}
                    endDate={endDate}
                    minDate={timeRangeEndMinDate}
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <CarDescriptionRowProperty
                type={CarDescriptionRowPropertyEnum.CIRCLE}
                title="Ilość godzin"
                bgColor="var(--primary-color)"
                color="var(--light-text-color)"
                value={Math.abs(endDate.getTime() - startDate.getTime()) / 36e5}
              />
              <CarDescriptionRowProperty
                type={CarDescriptionRowPropertyEnum.CIRCLE}
                title="Kwota"
                bgColor="var(--text-color)"
                color="var(--light-text-color)"
                value={
                  car
                    ? (car.CenaZaGodzine *
                        Math.abs(endDate.getTime() - startDate.getTime())) /
                      36e5
                    : undefined
                }
              />
            </div>
            <input
              type="number"
              id="Kwota"
              name="Kwota"
              required
              disabled
              value={
                car
                  ? (car.CenaZaGodzine *
                      Math.abs(endDate.getTime() - startDate.getTime())) /
                    36e5
                  : undefined
              }
              hidden
            />
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
