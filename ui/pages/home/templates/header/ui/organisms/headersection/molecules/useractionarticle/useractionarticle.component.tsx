import { Article } from "../../../../../../../../../common";
import styles from "./useractionarticle.module.css";

const UserActionArticle = () => (
  <Article
    className={styles.userActionArticle}
    titleProps={{ title: "Make your life easier" }}
    paragraphProps={{
      paragraphText:
        "We want to lending car easier for you. Check our offer and decide what car to drive.",
    }}
    buttonsProps={{
      buttonData: [
        { text: "Rent a car now", active: true },
        { text: "Check prices" },
      ],
    }}
  />
);

export default UserActionArticle;
