import styles from "./tabbar.module.scss";

const TabBar = () => {
  return (
    <div className={styles.tabBar}>
      {[1, 2, 3].map((stepNumber) => (
        <span key={`form-step-${stepNumber}`} className={styles.tabStep}>
          {stepNumber}
        </span>
      ))}
    </div>
  );
};

export default TabBar;
