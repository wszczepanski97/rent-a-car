import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
} from "react";

type TabDropdownProps = {
  dataSource: string[];
  placeholder: string;
  dropdownRef: MutableRefObject<DropDownListComponent | null>;
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  setSelectedProperty: Dispatch<SetStateAction<any>>;
};

const TabDropdown: FC<TabDropdownProps> = ({
  setDisabled,
  setSelectedProperty,
  dropdownRef,
  ...rest
}) => {
  const onDropdownChange = useCallback(
    (e: any) => {
      setDisabled?.(false);
      setSelectedProperty(e.value);
    },
    [setDisabled, setSelectedProperty]
  );
  return (
    <DropDownListComponent
      ref={dropdownRef}
      onChange={onDropdownChange}
      {...rest}
    />
  );
};

export default TabDropdown;
