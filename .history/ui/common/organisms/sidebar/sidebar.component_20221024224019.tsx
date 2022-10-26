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

      // Track all sections that have an `id` applied
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
      });
    });
  });
  return active ? (
    <nav className={styles.sidebar}>
      <ol>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li>
          <a href="#request-response">Request &amp; Response</a>
        </li>
        <li>
          <a href="#authentication">Authentication</a>
        </li>
        <li>
          <a href="#endpoints">Endpoints</a>
          <ul>
            <li className="">
              <a href="#endpoints--root">Root</a>
            </li>
            <li className="">
              <a href="#endpoints--cities-overview">Cities Overview</a>
            </li>
            <li className="">
              <a href="#endpoints--city-detail">City Detail</a>
            </li>
            <li className="">
              <a href="#endpoints--city-config">City Config</a>
            </li>
            <li className="">
              <a href="#endpoints--city-spots-overview">City Spots Overview</a>
            </li>
            <li className="">
              <a href="#endpoints--city-spot-detail">City Spot Detail</a>
            </li>
            <li className="">
              <a href="#endpoints--city-icons-overview">City Icons Overview</a>
            </li>
            <li className="">
              <a href="#endpoints--city-icon-detail">City Icon Detail</a>
            </li>
          </ul>
        </li>
        <li className="">
          <a href="#links">Links</a>
        </li>
        <li className="">
          <a href="#expanders">Expanders</a>
        </li>
        <li className="">
          <a href="#filters">Filters</a>
        </li>
      </ol>
    </nav>
  ) : (
    <button
      className="openbtn"
      onClick={() => setActive(true)}
      style={{
        position: "absolute",
        top: "50%",
        left: "-5%",
        zIndex: 1,
        borderRadius: "50%",
      }}
    >
      Open Sidebar
    </button>
  );
};

export default Sidebar;
