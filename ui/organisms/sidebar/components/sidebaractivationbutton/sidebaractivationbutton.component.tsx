import classNames from "classnames";
import { SidebarContext } from "contexts/sidebar.context";
import { m as motion } from "framer-motion";
import Head from "next/head";
import { useContext } from "react";
import styles from "./sidebaractivationbutton.module.scss";

const SidebarActivationButton = () => {
  const { open, cycleOpen } = useContext(SidebarContext);
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className={styles.sidebarActivationButtonWrapper}
        style={
          open
            ? {
                left: 170,
                background:
                  "linear-gradient(90deg, transparent 50%, var(--dark-background-color) 50%)",
              }
            : undefined
        }
      >
        <motion.i
          className={classNames(
            styles.sidebarActivationButton,
            "bx",
            open ? "bx-chevrons-left" : "bx-chevrons-right bx-tada"
          )}
          //@ts-ignore
          onClick={cycleOpen}
        ></motion.i>
      </div>
    </>
  );
};

export default SidebarActivationButton;
