import styles from "./sidebar.module.scss";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
