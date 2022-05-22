import { MyDepartmentAdminPageProps } from "pages/coordinator/mydepartment";
import { FC } from "react";
import { DeptEmpsSectionTable } from "./organisms/deptempssectiontable.component";

const DeptEmpsSection: FC<MyDepartmentAdminPageProps> = ({ deptEmps }) => (
  <section id="deptEmpsSection">
    <DeptEmpsSectionTable deptEmps={deptEmps} />
  </section>
);

export default DeptEmpsSection;
