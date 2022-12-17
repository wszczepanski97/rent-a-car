import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  Dispatch,
  FC,
  memo,
  MutableRefObject,
  SetStateAction,
  useCallback,
} from "react";

type TabDropdownProps = {
  dataSource: string[];
  placeholder: string;
  dropdownRef: MutableRefObject<DropDownListComponent | null>;
  value: any;
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  setSelectedProperty: Dispatch<SetStateAction<any>>;
};

const TabDropdown: FC<TabDropdownProps> = memo(
  ({ setDisabled, setSelectedProperty, dropdownRef, value, ...rest }) => {
    const onDropdownChange = useCallback(
      (e: any) => {
        setSelectedProperty(e.value);
      },
      [setSelectedProperty]
    );
    return (
      <DropDownListComponent
        ref={dropdownRef}
        onChange={onDropdownChange}
        value={value}
        {...rest}
      />
    );
  }
);

export default TabDropdown;
