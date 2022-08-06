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
      document.getElementById(`err${index}`)!.innerText = "";
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
