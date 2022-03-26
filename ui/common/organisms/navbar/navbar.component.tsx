import styles from './navbar.module.css';
import { PageTitle } from "./atoms";
import { NavbarList } from './molecules';

const Navbar = () => (
    <nav className={styles.Navbar}>
        <PageTitle />
        <NavbarList />
    </nav>
);


export default Navbar;