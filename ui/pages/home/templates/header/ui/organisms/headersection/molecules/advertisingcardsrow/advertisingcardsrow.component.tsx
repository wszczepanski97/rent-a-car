import { AdvertisingCard } from "./molecules";
import { CardRow } from "../../../../../../../../../common";
import styles from "./advertisingcardsrow.module.css";

const AdvertisingCardsRow = () => (
  <CardRow className={styles.advertisingCardsRow}>
    <AdvertisingCard
      titleProps={{ title: "Best car lender" }}
      paragraphProps={{
        paragraphText: "We focus on ergonomics and meeting you where you work.",
      }}
    />
    <AdvertisingCard
      titleProps={{ title: "Easy to lend" }}
      paragraphProps={{
        paragraphText: "Just type what's on your mind and we'll get you there.",
      }}
    />
    <AdvertisingCard
      blue
      titleProps={{ title: "Huge selection of cars" }}
      paragraphProps={{
        paragraphText: "Choose whatever car you want and enjoy the ride!",
      }}
    />
  </CardRow>
);

export default AdvertisingCardsRow;
