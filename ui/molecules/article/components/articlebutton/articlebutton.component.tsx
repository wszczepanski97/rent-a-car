import classnames from "classnames/bind";
import type { FC } from "react";
import styles from "./articlebutton.module.scss";
import { ArticleButtonProps } from "./articlebutton.props";

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

export default ArticleButton;
