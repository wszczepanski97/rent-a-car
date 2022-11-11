import { SidebarContext } from "contexts/sidebar.context";
import { AnimatePresence, m as motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "ui/atoms/link";
import PageTitle from "ui/organisms/navbar/components/pagetitle";
import SidebarActivationButton from "./components/sidebaractivationbutton";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const router = useRouter();
  const [pageLinks, setPageLinks] = useState<Element[]>();
  let [hashLinks, setHashLinks] = useState<Element[]>();
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
    setPageLinks(Array.from(document.querySelectorAll("nav li[id]")));
    setHashLinks(Array.from(document.querySelectorAll("section[id]")));
  }, [router.pathname]);

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
                {pageLinks?.length ? (
                  <>
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
                      {pageLinks.map((item) => (
                        <li key={`sidebar-page-link-${item.id}`}>
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            style={{ display: "flex" }}
                          >
                            <i
                              className={`bx ${item.getAttribute("data-icon")}`}
                            ></i>
                            <Link
                              href={item.getAttribute("data-link") || ""}
                              name={item.id}
                            />
                          </motion.div>
                        </li>
                      ))}
                    </div>
                  </>
                ) : null}
                {hashLinks?.length ? (
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
                    {hashLinks.map((item) => (
                      <li key={`sidebar-hash-link-${item.id}`}>
                        <motion.a
                          href={`#${item.id}`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.1 }}
                        >
                          <i className="bx bx-hash"></i>
                          <span className="links_name">{item.id}</span>
                        </motion.a>
                      </li>
                    ))}
                  </div>
                ) : null}
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
