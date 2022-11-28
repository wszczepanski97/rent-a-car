import { FC, useContext } from "react";
import { RegisterPageProps } from "templates/common/register/register.props";
import {
  inputLoginValidationRule,
  inputNameValidationRule,
} from "templates/coordinator/mydepartment/ui/deptcarsssection/organisms/deptcarssectiontable/validations";
import {
  inputDrivingLicenseNumberValidationRule,
  inputEmailValidationRule,
  inputIDNumberValidationRule,
  inputPasswordValidationRule,
  inputPeselNumberValidationRule,
  inputPhoneNumberValidationRule,
} from "templates/coordinator/mydepartment/ui/deptempssection/organisms/deptempssectiontable/validations";
import { UserRole } from "types/userrole/userrole.type";
import { UserRoleKey } from "types/userrole/userrolekey.type";
import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput/userforminput.component";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup/userforminputgroup.component";
import UserFormSelect from "ui/templates/userform/components/userformcontainer/components/userformselect/userformselect.component";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";

const RegisterSectionForm: FC<RegisterPageProps> = ({
  allJobRoles,
  allLocations,
}) => {
  const { activeDataItem, setActiveDataItem } = useContext(UserFormContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <UserFormInputGroup>
          <UserFormInput
            placeholder="Wprowadź imię..."
            type="text"
            name="Imię"
            minLength={2}
            maxLength={32}
            validations={inputNameValidationRule}
          />
          <UserFormInput
            placeholder="Wprowadź nazwisko..."
            type="text"
            name="Nazwisko"
            minLength={2}
            maxLength={32}
            validations={inputNameValidationRule}
          />
          <UserFormInput
            placeholder="Wprowadź email..."
            type="email"
            name="Email"
            validations={inputEmailValidationRule}
          />
        </UserFormInputGroup>
        <UserFormInputGroup>
          <UserFormSelect
            name="Lokalizacja"
            options={allLocations.map((location) => (
              <option
                key={location.IdLokalizacje}
                value={location.IdLokalizacje}
              >
                {location.Miejscowosc} {location.Ulica} {location.NumerUlicy}
              </option>
            ))}
          />
          <UserFormInput
            placeholder="Wprowadź numer..."
            type="tel"
            name="Numer Telefonu"
            maxLength={9}
            validations={inputPhoneNumberValidationRule}
          />
          <UserFormInput
            placeholder="Wprowadź pesel..."
            type="text"
            name="Pesel"
            maxLength={11}
            validations={inputPeselNumberValidationRule}
          />
        </UserFormInputGroup>
        <UserFormInputGroup>
          {activeDataItem !== "CLIENT" && (
            <UserFormSelect
              name="Rola"
              options={allJobRoles
                .filter((jobRole) => jobRole.Nazwa !== "KLIENT")
                .map((jobRole) => (
                  <option
                    key={jobRole.IdRole}
                    value={jobRole.IdRole}
                    id={jobRole.Nazwa}
                  >
                    {jobRole.Nazwa}
                  </option>
                ))}
              onSelectChange={(e) => {
                const role = e.target[parseInt(e.target.value) - 1]
                  .id as UserRole;
                setActiveDataItem(
                  Object.keys(UserRole)[
                    Object.values(UserRole).indexOf(role)
                  ] as UserRoleKey
                );
              }}
            />
          )}
          <UserFormInput
            placeholder="Wprowadź numer..."
            type="text"
            name="Numer Dowodu"
            maxLength={9}
            validations={inputIDNumberValidationRule}
          />
          <UserFormInput
            placeholder="Wprowadź numer..."
            type="text"
            name="Numer Prawa Jazdy"
            maxLength={17}
            validations={inputDrivingLicenseNumberValidationRule}
          />
        </UserFormInputGroup>
        <UserFormInputGroup>
          <UserFormInput
            placeholder="Wprowadź login..."
            type="text"
            name="Login"
            validations={inputLoginValidationRule}
          />
          <UserFormInput
            placeholder="Wprowadź hasło..."
            type="password"
            name="Hasło"
            validations={inputPasswordValidationRule}
          />
        </UserFormInputGroup>
      </div>
    </>
  );
};

export default RegisterSectionForm;
