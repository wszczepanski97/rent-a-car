import CommonTabFirst from "templates/common/register/components/registersection/components/commontabfirst/commontabfirst.component";
import TabBar from "templates/common/register/components/registersection/components/tabbar";

const ClientRegistrationForm = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <TabBar />
      <CommonTabFirst />
    </div>
  );
};

export default ClientRegistrationForm;
