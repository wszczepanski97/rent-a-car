import { useSession } from "next-auth/react";
import { FC } from "react";
import { UserRole } from "templates/common";
import LogoutButton from "ui/common/atoms/logoutbutton/logoutbutton.component";
import { NavbarListItem } from "./atoms";
import NavbarListItemHover from "./atoms/navbarlistitemhover/navbarlistitemhover.component";
import styles from "./navbarlist.module.scss";

const NavbarList: FC = () => {
  const { data: session } = useSession();
  const role: UserRole | undefined = session ? session.user.role : undefined;
  return (
    <ul className={styles.navbarList}>
      <div className={styles.navbarListContainer}>
        <div className={styles.navbarListItemGroup}>
          {role === "KLIENT" ? (
            <>
              <NavbarListItem name="Dashboard" href="/klient/dashboard" />
              <NavbarListItem name="Rent a car" href="/klient/rent" />
              <NavbarListItem name="My rentals" href="/klient/myrentals" />
              <NavbarListItem name="Pricing" href="/pricing" />
              <LogoutButton>
                <NavbarListItem name="Sign out" href="/signout" />
              </LogoutButton>
            </>
          ) : role === "ADMIN" ? (
            <>
              <NavbarListItem name="Home" href="/admin/dashboard" />
              <NavbarListItem name="Scheduler" href="/admin/scheduler" />
              <NavbarListItem name="Map" href="/admin/map" />
              <NavbarListItem name="Charts" href="/admin/charts" />
              <LogoutButton>
                <NavbarListItem name="Sign out" href="/signout" />
              </LogoutButton>
            </>
          ) : !!role ? (
            <>
              <NavbarListItem name="Home" href="/employee/dashboard" />
              <NavbarListItem name="My jobs" href="/employee/jobs" />
              <NavbarListItem name="Profile" href="/employee/profile" />
              <LogoutButton>
                <NavbarListItem name="Sign out" href="/signout" />
              </LogoutButton>
            </>
          ) : (
            <>
              <NavbarListItem name="Home" href="/" />
              <NavbarListItemHover
                title="Sign in"
                options={[
                  { name: "Sign as client", href: "login?role=client" },
                  { name: "Sign as admin", href: "login?role=admin" },
                  { name: "Sign as cleaner", href: "login?role=cleaner" },
                  { name: "Sign as mechanic", href: "login?role=mechanic" },
                  {
                    name: "Sign as coordinator",
                    href: "login?role=coordinator",
                  },
                ]}
              />
              <NavbarListItem name="Pricing" href="/pricing" />
            </>
          )}
        </div>
        {/* <div className={styles.navbarListIconGroup}>
          <NavbarListIcon src="/images/SearchIcon.svg" alt="SearchIcon" />
          <NavbarListIcon src="/images/BasketIcon.svg" alt="BasketIcon" />
        </div> */}
      </div>
    </ul>
  );
};

export default NavbarList;
