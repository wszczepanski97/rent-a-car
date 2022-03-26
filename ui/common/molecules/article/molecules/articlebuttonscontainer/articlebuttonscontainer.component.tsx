import styles from './articlebuttonscontainer.module.css';
import { ArticleButton, ArticleButtonProps } from "../../atoms";

const ArticleButtonsContainer = ({ buttonData }: ArticleButtonsContainerProps) => (
    <div className={styles.articleButtonsContainer}>
        {buttonData.map((buttonProps, index) => <ArticleButton key={index} {...buttonProps}/>)}
    </div>
);

export type ArticleButtonsContainerProps = {
    buttonData: ArticleButtonProps[];
}

export default ArticleButtonsContainer;