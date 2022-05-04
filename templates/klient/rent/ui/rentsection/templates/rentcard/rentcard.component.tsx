import { useSession } from "next-auth/react";
import { FC, FormEventHandler, useState } from "react";
import { CarProps } from "templates/klient";
import { CarCard, Card, CardType } from "ui";
import styles from "./rentcard.module.scss";

const RentCard: FC<CarProps> = ({ car }) => {
  const session = useSession();
  const [error, setError] = useState("");
  // const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();
  //   const data = {
  //     dateFrom: event.target.dateFrom.value,
  //     dateTo: event.target.dateTo.value,
  //     price: event.target.price.value,
  //   };

  //   // Send the data to the server in JSON format.
  //   const JSONdata = JSON.stringify(data);

  //   // API endpoint where we send form data.
  //   const endpoint = "/api/rent";

  //   // Form the request for sending data to the server.
  //   const options = {
  //     // The method is POST because we are sending data.
  //     method: "POST",
  //     // Tell the server we're sending JSON.
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // Body of the request is the JSON data we created above.
  //     body: JSONdata,
  //   };

  //   // Send the form data to our forms API on Vercel and get a response.
  //   const response = await fetch(endpoint, options);

  //   // Get the response data from server as JSON.
  //   // If server returns the name submitted, that means the form works.
  //   const result = await response.json();
  //   alert(`Is this your full name: ${result.data}`);
  // };
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
            carBody: car.samochodyszczegoly.Nadwozie,
            fuelType: car.samochodyszczegoly.RodzajPaliwa,
            numberOfSeats: car.samochodyszczegoly.IloscMiejsc,
          }}
          photoProps={{
            src: car.Zdjecia?.split(";")[0] || "",
            alt: `${car.Marka} ${car.Model}`,
          }}
          titleProps={{ title: `${car.Marka} ${car.Model}` }}
          withoutBtns
        />
      </div>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          // onSubmit={handleSubmit}
        >
          <label htmlFor="DataOd">Data od</label>
          <input type="date" id="DataOd" name="DataOd" required />
          <label htmlFor="DataDo">Data do</label>
          <input type="date" id="DataDo" name="DataDo" required />
          <label htmlFor="Kwota">Kwota</label>
          <input
            type="number"
            id="Kwota"
            name="Kwota"
            disabled
            required
            value={car.CenaZaDzien * 5}
          />
          {error && <div>{error}</div>}
          <button type="submit">Zamów</button>
        </form>
      </div>
    </Card>
  );
};

export default RentCard;
