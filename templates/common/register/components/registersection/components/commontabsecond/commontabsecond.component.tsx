import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput/userforminput.component";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup/userforminputgroup.component";

const CommonTabSecond = () => {
  return (
    <>
      <UserFormInputGroup>
        <UserFormInput
          required
          placeholder="Wprowadź numer prawa jazdy..."
          type="text"
          name="Numer prawa jazdy"
        />
        <UserFormInput
          required
          placeholder="Wprowadź email..."
          type="text"
          name="Email"
        />
      </UserFormInputGroup>
      <UserFormInputGroup>
        <UserFormInput
          required
          placeholder="Wprowadź numer telefonu..."
          type="text"
          name="Numer telefonu"
        />
        <UserFormInput
          required
          placeholder="Wprowadź lokalizację..."
          type="text"
          name="Lokalizacja"
        />
      </UserFormInputGroup>
    </>
  );
};

export default CommonTabSecond;
