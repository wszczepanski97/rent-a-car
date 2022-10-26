import classnames from "classnames/bind";
import { FC } from "react";
import styles from "./articlebutton.module.scss";

const cx = classnames.bind(styles);

const ArticleButton: FC<ArticleButtonProps> = ({
  text,
  active = false,
  onClick,
}) => (
  <button
    className={cx(
      styles.articleButton,
      "btn-text",
      "animate__animated",
      "animate__bounce",
      "animate__infinite",
      "animate__slow",
      {
        [styles.articleButton_Active]: active,
      }
    )}
    onClick={onClick}
  >
    {text}
  </button>
);

export type ArticleButtonProps = {
  text: string;
  active?: boolean;
  onClick?(): void;
};

export default ArticleButton;
