import { FC } from "react";
import { ArticleButton, ArticleButtonProps } from "../../atoms";
import styles from "./articlebuttonscontainer.module.scss";

const ArticleButtonsContainer: FC<ArticleButtonsContainerProps> = ({
  buttonData,
}) => (
  <div className={styles.articleButtonsContainer}>
    {buttonData.map((buttonProps, index) => (
      <ArticleButton key={index} {...buttonProps} />
    ))}
  </div>
);

export type ArticleButtonsContainerProps = {
  buttonData: ArticleButtonProps[];
};

export default ArticleButtonsContainer;
