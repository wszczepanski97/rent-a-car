import { useRouter } from "next/router";
import { FC } from "react";
import { Article } from "ui";
import styles from "./useractionarticle.module.scss";

const UserActionArticle: FC = () => {
  const router = useRouter();
  return (
    <Article
      className={styles.userActionArticle}
      titleProps={{ title: "UŁATW SWOJE ŻYCIE" }}
      paragraphProps={{
        paragraphText:
          "Chcemy ułatwić Ci wypożyczanie samochodu. Sprawdź naszą ofertę i zdecyduj jakim samochodem jeździć.",
      }}
      buttonProps={{
        buttonData: [
          {
            text: "Wypożycz teraz",
            active: true,
            onClick: () => {
              router.push("/login?role=client");
            },
          },
          {
            text: "Sprawdź ceny",
            onClick: () => {
              router.push("/pricing");
            },
          },
        ],
      }}
    />
  );
};

export default UserActionArticle;
