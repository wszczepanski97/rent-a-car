import dynamic from "next/dynamic";
export default dynamic(
  () => import("./cardescriptionrowavailabilityproperty.component")
);
