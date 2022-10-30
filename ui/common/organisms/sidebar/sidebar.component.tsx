import { SidebarContext } from "contexts/sidebar-context";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { SidebarActivationButton } from "ui";
import { PageTitle } from "ui/common/organisms/navbar/ui";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.intersectionRatio > 0) {
            document
              ?.querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.add("active");
          } else {
            document
              ?.querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.remove("active");
          }
        });
      });
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
      });
    });
  });

  const { open } = useContext(SidebarContext);
  return (
    <AnimatePresence>
      {open ? (
        <>
          <Head>
            <link
              href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
              rel="stylesheet"
            />
          </Head>
          <motion.aside
            className={styles.sidebar}
            initial={{ width: 0 }}
            animate={{
              width: "auto",
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
          >
            <div className={styles.pageTitleContainer}>
              <i className="bx bxl-c-plus-plus icon"></i>
              <PageTitle />
            </div>
            <motion.div initial="closed" animate="open" variants={sideVariants}>
              <ol>
                <div>
                  <h4
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Akcje
                  </h4>
                  {Array.from(document.querySelectorAll("nav li[id]")).map(
                    (item) => (
                      <li key={`sidebar-item-${item.id}`}>
                        <motion.a
                          href={item.getAttribute("data-link")}
                          variants={itemVariants}
                          whileHover={{ scale: 1.1 }}
                        >
                          <i
                            className={`bx ${item.getAttribute("data-icon")}`}
                          ></i>
                          <span className="links_name">{item.id}</span>
                        </motion.a>
                      </li>
                    )
                  )}
                </div>
                <div>
                  <h4
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Strona
                  </h4>
                  {Array.from(document.querySelectorAll("section[id]")).map(
                    (item) => (
                      <li key={`sidebar-item-${item.id}`}>
                        <motion.a
                          href={`#${item.id}`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.1 }}
                        >
                          <i className="bx bx-hash"></i>
                          <span className="links_name">{item.id}</span>
                        </motion.a>
                      </li>
                    )
                  )}
                </div>
              </ol>
            </motion.div>
            <SidebarActivationButton />
          </motion.aside>
        </>
      ) : (
        <SidebarActivationButton />
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
