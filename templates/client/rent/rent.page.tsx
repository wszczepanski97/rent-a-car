import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import { UserRole } from "types/userrole/userrole.type";
import RentSection from "./components/rentsection";

export const RentPage: NextPage<CarPageProps> = ({ car }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const role: UserRole | undefined = session?.user.role;
  useEffect(() => {
    if (role !== "KLIENT") {
      router.push("/login");
    }
  }, [role, router]);
  return <RentSection car={car} />;
};

export default RentPage;
