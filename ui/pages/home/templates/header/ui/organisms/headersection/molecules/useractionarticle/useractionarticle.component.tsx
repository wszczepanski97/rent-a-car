import { FC } from "react";
import { Article } from "ui";
import styles from "./useractionarticle.module.scss";

const UserActionArticle: FC = () => (
  <Article
    className={styles.userActionArticle}
    titleProps={{ title: "Make your life easier" }}
    paragraphProps={{
      paragraphText:
        "We want to lending car easier for you. Check our offer and decide what car to drive.",
    }}
    buttonProps={{
      buttonData: [
        { text: "Rent a car now", active: true },
        { text: "Check prices" },
      ],
    }}
  />
);

export default UserActionArticle;
