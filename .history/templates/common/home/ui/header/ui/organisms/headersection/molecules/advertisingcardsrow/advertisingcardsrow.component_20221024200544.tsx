import { FC } from "react";
import { CardRow } from "ui";
import { AdvertisingCard } from "./molecules";

const AdvertisingCardsRow: FC = () => (
  <CardRow style={{ zIndex: 1 }}>
    <AdvertisingCard
      titleProps={{ title: "Najlepszy partner" }}
      paragraphProps={{
        paragraphText:
          "Stawiamy na ergonomię i dostępność aut tam, gdzie chcesz.",
      }}
    />
    <AdvertisingCard
      titleProps={{ title: "Proste działanie" }}
      paragraphProps={{
        paragraphText:
          "Po prostu wpisz, co masz na myśli, a my Cię tam zaprowadzimy.",
      }}
    />
    <AdvertisingCard
      blue
      titleProps={{ title: "Duży wybór aut" }}
      paragraphProps={{
        paragraphText:
          "Wybierz dowolny samochód z naszej oferty i ciesz się bezkresną jazdą w nieznane!",
      }}
    />
  </CardRow>
);

export default AdvertisingCardsRow;
