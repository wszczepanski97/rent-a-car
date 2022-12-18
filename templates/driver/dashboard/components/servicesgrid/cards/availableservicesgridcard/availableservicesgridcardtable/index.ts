import dynamic from "next/dynamic";
export default dynamic(
  () => import("./availableservicesgridcardtable.component")
);
