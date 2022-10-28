import { SidebarContext } from "contexts/sidebar-context";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
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
        <motion.aside
          className={styles.sidebar}
          initial={{ width: 0 }}
          animate={{
            width: "15rem",
          }}
          exit={{
            width: 0,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <PageTitle />
          <motion.div initial="closed" animate="open" variants={sideVariants}>
            <ol>
              {Array.from(document.querySelectorAll("nav li[id]")).map(
                (listitem) => (
                  <li key={`listitem-${listitem.id}`}>
                    <motion.a
                      href={`#${listitem.id}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                    >
                      {listitem.id}
                    </motion.a>
                  </li>
                )
              )}
              {Array.from(document.querySelectorAll("section[id]")).map(
                (section) => (
                  <li key={`section-${section.id}`}>
                    <motion.a
                      href={`#${section.id}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                    >
                      {section.id}
                    </motion.a>
                  </li>
                )
              )}
            </ol>
          </motion.div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};

export default Sidebar;
