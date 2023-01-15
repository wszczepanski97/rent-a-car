import CarMechanicSVG from "boxiconsvgs/CarMechanicSVG.component";
import CarWashSVG from "boxiconsvgs/CarWashSVG.component";
import GroupSVG from "boxiconsvgs/GroupSVG.component";
import KeySVG from "boxiconsvgs/KeySVG.component";
import UserCircleSVG from "boxiconsvgs/UserCircleSVG.component";
import { useContext } from "react";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import UserFormMenuBorder from "./components/userformmenuborder";
import UserFormMenuButton from "./components/userformmenubutton";
import styles from "./userformmenu.module.scss";

const UserFormMenu = () => {
  const { menuRef, type, activeDataItem } = useContext(UserFormContext);
  return (
    <div className={styles.userFormMenu} ref={menuRef}>
      {type === UserFormContextEnum.LOGIN ? (
        <>
          <UserFormMenuButton
            color="#ff8c00"
            dataItem="CLIENT"
            Icon={<UserCircleSVG />}
          />
          <UserFormMenuButton
            color="#f54888"
            dataItem="COORDINATOR"
            Icon={<GroupSVG />}
          />
          <UserFormMenuButton
            color="#4343f5"
            dataItem="DRIVER"
            Icon={<KeySVG />}
          />
          <UserFormMenuButton
            color="#bb9000"
            dataItem="MECHANIC"
            Icon={<CarMechanicSVG />}
          />
          <UserFormMenuButton
            color="#22604c"
            dataItem="CLEANER"
            Icon={<CarWashSVG />}
          />
        </>
      ) : (
        <>
          <UserFormMenuButton
            color="#ff8c00"
            dataItem="CLIENT"
            Icon={<UserCircleSVG />}
          />
          {activeDataItem === "CLIENT" || activeDataItem === "COORDINATOR" ? (
            <UserFormMenuButton
              color="#f54888"
              dataItem="COORDINATOR"
              Icon={<GroupSVG />}
            />
          ) : activeDataItem === "DRIVER" ? (
            <UserFormMenuButton
              color="#4343f5"
              dataItem="DRIVER"
              Icon={<KeySVG />}
            />
          ) : activeDataItem === "MECHANIC" ? (
            <UserFormMenuButton
              color="#bb9000"
              dataItem="MECHANIC"
              Icon={<CarMechanicSVG />}
            />
          ) : (
            <UserFormMenuButton
              color="#22604c"
              dataItem="CLEANER"
              Icon={<CarWashSVG />}
            />
          )}
        </>
      )}
      <UserFormMenuBorder />
    </div>
  );
};

export default UserFormMenu;
