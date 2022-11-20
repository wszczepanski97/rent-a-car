import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup";

const CommonTabFirst = () => {
  return (
    <div style={{ display: "flex", gap: 50 }}>
      <UserFormInputGroup>
        <UserFormInput
          required
          placeholder="Wprowadź imię..."
          type="text"
          name="Imię"
        />
        <UserFormInput
          required
          placeholder="Wprowadź nazwisko..."
          type="text"
          name="Nazwisko"
        />
      </UserFormInputGroup>
      <UserFormInputGroup>
        <UserFormInput
          required
          placeholder="Wprowadź pesel..."
          type="text"
          name="Pesel"
        />
        <UserFormInput
          required
          placeholder="Wprowadź numer dowodu..."
          type="text"
          name="Numer Dowodu"
        />
      </UserFormInputGroup>
    </div>
  );
};

export default CommonTabFirst;
