import { FC } from "react";
import { ArticleButton, ArticleButtonProps } from "../../atoms";
import styles from "./articlebuttoncontainer.module.scss";

const ArticleButtonContainer: FC<ArticleButtonContainerProps> = ({
  buttonData,
}) => (
  <div className={styles.ArticleButtonContainer}>
    {buttonData.map((buttonProps, index) => (
      <ArticleButton key={index} {...buttonProps} />
    ))}
  </div>
);

export type ArticleButtonContainerProps = {
  buttonData: ArticleButtonProps[];
};

export default ArticleButtonContainer;
