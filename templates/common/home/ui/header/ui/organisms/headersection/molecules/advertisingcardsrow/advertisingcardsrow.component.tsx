import { AdvertisingCard } from "./molecules";
import { CardRow } from "ui";
import { FC } from "react";

const AdvertisingCardsRow: FC = () => (
  <CardRow style={{ height: "210px", zIndex: 1 }}>
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
