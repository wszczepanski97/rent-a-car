import { FC } from "react";
import styles from "./articlebutton.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

const ArticleButton: FC<ArticleButtonProps> = ({
  text,
  active = false,
  onClick,
}) => (
  <button
    className={cx(styles.articleButton, "btn-text", {
      [styles.articleButton_Active]: active,
    })}
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
