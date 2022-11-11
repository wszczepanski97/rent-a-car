import { signOut } from "next-auth/react";
import type { FC } from "react";
import styles from "./logoutbutton.module.scss";

const LogoutButton: FC = ({ children }) => (
  <button
    onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    className={styles.logoutButton}
  >
    {children}
  </button>
);

export default LogoutButton;
