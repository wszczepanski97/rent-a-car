import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import classnames from "classnames";
import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import { AddEventContext } from "../../contexts/addevent.context";
import styles from "../styles.module.scss";

const cx = classnames.bind(styles);

export enum TabNextButtonType {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

type TabNextButtonDefaultProps = {
  type: TabNextButtonType.DEFAULT;
  customOnClick?: undefined;
  dropdownRef: MutableRefObject<DropDownListComponent | null>;
  errorMsg: string;
  disabled: boolean;
  setSelectedProperty: Dispatch<SetStateAction<any>>;
};

type TabNextButtonCustomProps = {
  type: TabNextButtonType.CUSTOM;
  customOnClick(): void;
  dropdownRef?: undefined;
  errorMsg?: string;
  disabled?: boolean;
  setSelectedProperty?: undefined;
};

export type TabNextButtonProps = (
  | TabNextButtonDefaultProps
  | TabNextButtonCustomProps
) & { index: number };

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
      const errorElement = document.getElementById(`err${index}`);
      if (errorElement) {
        errorElement.innerText = "";
      }
      removeItem(currentTab);
      currentTab.current?.enableTab(index + 1, true);
      currentTab.current?.enableTab(index, false);
      setSelectedProperty(dropdownRef.current.value);
    } else {
      const errorSelector = document.getElementById(`err${index}`);
      if (errorSelector !== null && errorMsg) {
        errorSelector.innerText = errorMsg;
      }
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
