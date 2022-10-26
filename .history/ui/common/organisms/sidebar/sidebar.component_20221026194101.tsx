import { SidebarContext } from "contexts/sidebar-context";
import { useContext, useEffect } from "react";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const { active, setActive } = useContext(SidebarContext);
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

  return (
    <nav className={styles.sidebar}>
      <ol>
        {Array.from(document.querySelectorAll("section[id]")).map((section) => (
          <li key={`section-${section.id}`}>
            <a href={`#${section.id}`}>{section.id}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Sidebar;
