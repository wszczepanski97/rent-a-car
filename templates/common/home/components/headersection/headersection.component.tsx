import classnames from "classnames";
import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import Photo from "ui/atoms/photo";
import UserActionArticle from "./components/useractionarticle/useractionarticle.component";
import styles from "./headersection.module.scss";

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
        <div className={styles["my-car"]}>
          <Carousel
            autoPlay
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            interval={5000}
          >
            {[
              "/images/Car-1.webp",
              "/images/Car-3.webp",
              "/images/Car-4.webp",
            ].map((photo, index) => (
              <div key={`photo-${index}`}>
                <Photo
                  alt=""
                  src={photo}
                  size={{ height: "470", width: "720" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
