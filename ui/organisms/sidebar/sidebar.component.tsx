import BoxiconSvgs from "boxiconsvgs";
import CPlusPlusSVG from "boxiconsvgs/CPlusPlusSVG.component";
import HashSVG from "boxiconsvgs/HashSVG.component";
import { SidebarContext } from "contexts/sidebar.context";
import { AnimatePresence, m as motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "ui/atoms/link";
import PageTitle from "ui/organisms/navbar/components/pagetitle";
import SidebarActivationButton from "./components/sidebaractivationbutton";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const router = useRouter();
  const [pageLinks, setPageLinks] = useState<Element[]>();
  const [hashLinks, setHashLinks] = useState<Element[]>();
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

  const { open } = useContext(SidebarContext);
  useEffect(() => {
    setPageLinks(Array.from(document.querySelectorAll("nav li[id]")));
    setHashLinks(Array.from(document.querySelectorAll("section[id]")));
  }, [open, router.route]);

  return (
    <AnimatePresence>
      {open ? (
        <>
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
              <CPlusPlusSVG />
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
                      {pageLinks.map((item) => {
                        console.log(`${item.getAttribute("data-icon")}`);
                        const Icon =
                          BoxiconSvgs[
                            `${item.getAttribute(
                              "data-icon"
                            )}` as keyof typeof BoxiconSvgs
                          ];
                        console.log(Icon);
                        return (
                          <li key={`sidebar-page-link-${item.id}`}>
                            <motion.div
                              variants={itemVariants}
                              whileHover={{ scale: 1.1 }}
                              style={{ display: "flex" }}
                            >
                              {Icon && <Icon />}
                              <Link
                                href={item.getAttribute("data-link") || ""}
                                name={item.id}
                              />
                            </motion.div>
                          </li>
                        );
                      })}
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
                          <HashSVG />
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
