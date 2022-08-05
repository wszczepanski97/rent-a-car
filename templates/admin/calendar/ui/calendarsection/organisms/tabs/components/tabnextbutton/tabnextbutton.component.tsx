import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import styles from "../styles.module.scss";
import classnames from "classnames";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { AddEventContext } from "../../contexts/addevent.context";
import { TabComponent } from "@syncfusion/ej2-react-navigations";

const cx = classnames.bind(styles);

export enum TabNextButtonType {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

type TabNextButtonDefaultProps = {
  type: TabNextButtonType.DEFAULT;
  customOnClick?: undefined;
  dropdownRef: MutableRefObject<DropDownListComponent | null>;
};

type TabNextButtonCustomProps = {
  type: TabNextButtonType.CUSTOM;
  customOnClick(): void;
  dropdownRef?: undefined;
};

export type TabNextButtonProps = (
  | TabNextButtonDefaultProps
  | TabNextButtonCustomProps
) & {
  disabled: boolean;
  errorMsg: string;
  index: number;
  setSelectedProperty: Dispatch<SetStateAction<any>>;
};

export const removeItem = (
  currentTab: React.MutableRefObject<TabComponent | null>
) => {
  if (currentTab?.current) {
    let tabItems = currentTab.current.element.querySelectorAll(".e-item");
    tabItems?.forEach((item, index) => {
      if (index > 0) {
        item.remove();
      }
    });
  }
};

const TabNextButton: FC<TabNextButtonProps> = ({
  customOnClick,
  disabled,
  dropdownRef,
  errorMsg,
  index,
  setSelectedProperty,
  type = TabNextButtonType.DEFAULT,
}) => {
  const { currentTab } = useContext(AddEventContext);
  const onClickByDropdown = useCallback(() => {
    if (dropdownRef?.current?.value) {
      document.getElementById(`err${index}`)!.innerText = "";
      removeItem(currentTab);
      currentTab.current?.enableTab(index + 1, true);
      currentTab.current?.enableTab(index, false);
      setSelectedProperty(dropdownRef.current.value);
    } else {
      document.getElementById(`err${index}`)!.innerText = errorMsg;
    }
  }, []);
  return (
    <button
      id="serviceType"
      className={cx("e-btn", styles.tabNextButton)}
      onClick={
        type === TabNextButtonType.DEFAULT ? onClickByDropdown : customOnClick
      }
      disabled={disabled}
    >
      Przejdź dalej
    </button>
  );
};

export default TabNextButton;
