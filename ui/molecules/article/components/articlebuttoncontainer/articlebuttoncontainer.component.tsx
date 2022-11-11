import type { FC } from "react";
import ArticleButton from "../articlebutton/articlebutton.component";
import styles from "./articlebuttoncontainer.module.scss";
import { ArticleButtonContainerProps } from "./articlebuttoncontainer.props";

const ArticleButtonContainer: FC<ArticleButtonContainerProps> = ({
  buttonData,
}) => (
  <div className={styles.ArticleButtonContainer}>
    {buttonData.map((buttonProps, index) => (
      <ArticleButton key={index} {...buttonProps} />
    ))}
  </div>
);

export default ArticleButtonContainer;
