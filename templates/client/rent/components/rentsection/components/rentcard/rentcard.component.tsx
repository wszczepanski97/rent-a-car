import { dodatkoweopcje, uslugi } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEventHandler, useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarDescriptionRowProperty from "templates/common/car/components/cardetailssection/components/cardescription/components/cardescriptionrowproperty/cardescriptionrowproperty.component";
import { CarDescriptionRowPropertyEnum } from "templates/common/car/components/cardetailssection/components/cardescription/components/cardescriptionrowproperty/cardescriptionrowproperty.enum";
import { getNextHalfHourDateForToday } from "templates/coordinator/calendar/ui/calendarsection/organisms/tabs/helpers/date-helper";
import ServicesGridCardInfo from "templates/driver/dashboard/components/servicesgrid/components/servicesgridcard/components/servicesgridcardinfo/servicesgridcardinfo.component";
import CarCard from "ui/molecules/carcard";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import styles from "./rentcard.module.scss";
import { RentCardProps } from "./rentcard.props";
import { RentCardSubmitFormType } from "./rentcardsubmitform.type";

const RentCard: FC<RentCardProps> = ({ car, additionalRentOptions }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [resUsluga, setResUsluga] = useState<uslugi>();
  const [success, setSuccess] = useState(false);
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
      dodatkoweOpcje: selectedAdditionalOptions,
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const {
      data: { usluga, error },
    } = await (await fetch("/api/client/rent", options)).json();
    if (error) {
      setError(error);
    }
    if (usluga) {
      setResUsluga(usluga[0] as uslugi);
      setSuccess(true);
    }
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

  const getAccesories = useCallback(
    () =>
      getDataNames("accesories").map(
        (accesory) =>
          additionalRentOptions.find(
            (additionalOption) => additionalOption.Nazwa === accesory
          ) as dodatkoweopcje
      ),
    [additionalRentOptions]
  );

  const getDataNames = (id: string) => {
    return Array.from(
      (document
        .getElementById(id)
        ?.querySelectorAll('input[type="checkbox"]') as
        | HTMLInputElement[]
        | undefined) || []
    )
      .filter((input: HTMLInputElement) => input.checked)
      .map((input) => input.labels?.[0].getAttribute("data-name") || "")
      .filter((accesory) => !!accesory);
  };

  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState(
    [] as dodatkoweopcje[]
  );

  const onAccesoryChange = useCallback(() => {
    setSelectedAdditionalOptions(getAccesories());
  }, [setSelectedAdditionalOptions, getAccesories]);

  const isAccesoryChecked = useCallback(
    (nazwa: string) => {
      return !!selectedAdditionalOptions?.find(
        (accesory) => accesory.Nazwa === nazwa
      );
    },
    [selectedAdditionalOptions]
  );

  return success ? (
    <Card type={CardType.CUSTOM} className={styles.successCard}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <h3>SUKCES!</h3>
          <ServicesGridCardInfo statement="Auto zostało wypożyczone!" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>
            Wypożyczone przez Ciebie auto to: {car?.Model} {car?.Marka}
          </h5>
          {resUsluga && (
            <h5>
              Czas wypożyczenia: {new Date(resUsluga.DataOd).toLocaleString()} -{" "}
              {new Date(resUsluga.DataDo).toLocaleString()}
            </h5>
          )}
          <h5>Pamiętaj zeby się nie spóźnić!</h5>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <button
            onClick={() => {
              router.push("/client/rent");
            }}
            style={{
              background: "linear-gradient(135deg, #e67171, #80419a)",
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              color: "var(--light-text-color)",
              width: 500,
              height: 40,
              cursor: "pointer",
              margin: "0 auto",
            }}
          >
            Wróć do listy samochodów
          </button>
          <button
            onClick={() => {
              router.push("/client/myrentals");
            }}
            style={{
              background: "linear-gradient(135deg, #e67171, #80419a)",
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              color: "var(--light-text-color)",
              width: 500,
              height: 40,
              cursor: "pointer",
              margin: "0 auto",
            }}
          >
            Sprawdź swoje wypożyczenia
          </button>
        </div>
      </div>
    </Card>
  ) : (
    <Card
      type={CardType.CUSTOM}
      className={styles.carCard}
      style={{ width: "100%" }}
    >
      <>
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
                      onChange={(date: Date) => {
                        setStartDate(date);
                        if (date >= endDate) {
                          setError(
                            "Data zakończenia nie moze byc wczesniejsza od daty rozpoczęcia."
                          );
                        } else {
                          setError("");
                        }
                      }}
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
                      onChange={(date: Date) => {
                        setEndDate(date);
                        if (date <= startDate) {
                          setError(
                            "Data zakończenia nie moze byc wczesniejsza od daty rozpoczęcia."
                          );
                        } else {
                          setError("");
                        }
                      }}
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
              <div className={styles.rentCardFormField} id="accesories">
                <label htmlFor="IdUbezpieczenia" style={{ marginBottom: 5 }}>
                  Dodatkowe opcje
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {additionalRentOptions.map((option) => (
                    <label
                      key={option.Nazwa}
                      className={styles.container}
                      data-name={option.Nazwa}
                    >
                      <label className="e-textlabel" style={{ paddingTop: 3 }}>
                        {option.Nazwa}
                      </label>
                      <input
                        type="checkbox"
                        onChange={onAccesoryChange}
                        checked={isAccesoryChecked(option.Nazwa)}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                  ))}
                </div>
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
                  value={
                    Math.abs(endDate.getTime() - startDate.getTime()) / 36e5
                  }
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
                          36e5 +
                        selectedAdditionalOptions.reduce(
                          (prev, curr) => prev + curr.KosztNaDzien,
                          0
                        )
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
              {error && <div style={{ color: "red" }}>{error}</div>}
              <button
                type="submit"
                className={styles.submit}
                disabled={!!error}
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
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            color: "var(--light-text-color)",
            width: 500,
            height: 40,
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          Wróć do listy samochodów
        </button>
      </>
    </Card>
  );
};

export default RentCard;
