import classnames from "classnames";
import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./headersection.module.scss";
import { UserActionArticle } from "./molecules";

const HeaderSection: FC = () => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      className={classnames(styles.headerSection, {
        [styles.sidebarActive]: open,
      })}
      id="Ułatw swoje życie"
    >
      <UserActionArticle />
      <div className={styles["right-sec"]}>
        <Carousel
          autoPlay
          dynamicHeight
          infiniteLoop
          interval={500}
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          swipeable
          width="60%"
        >
          <img alt="" src="/images/Car-1.webp" className={styles.carPhoto} />
          <img alt="" src="/images/Car-3.webp" className={styles.carPhoto} />
          <img alt="" src="/images/Car-4.png" className={styles.carPhoto} />
        </Carousel>
      </div>
    </section>
  );
};

export default HeaderSection;
