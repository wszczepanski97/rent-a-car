import styles from './articlebutton.module.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ArticleButton = ({ text, active = false }: ArticleButtonProps) => (
    <button className={cx(styles.articleButton, { [styles.articleButton_Active]: active })}>
        {text}
    </button>
);

export type ArticleButtonProps = {
    text: string;
    active?: boolean
}

export default ArticleButton;
