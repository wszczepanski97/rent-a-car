import { FC } from "react";
import { Article } from "ui";
import styles from "./useractionarticle.module.scss";

const UserActionArticle: FC = () => (
  <Article
    className={styles.userActionArticle}
    titleProps={{ title: "UŁATW SWOJE ŻYCIE" }}
    paragraphProps={{
      paragraphText:
        "Chcemy ułatwić Ci wypożyczanie samochodu. Sprawdź naszą ofertę i zdecyduj jakim samochodem jeździć.",
    }}
    buttonProps={{
      buttonData: [
        { text: "Wypożycz teraz", active: true },
        { text: "Sprawdź ceny" },
      ],
    }}
  />
);

export default UserActionArticle;
