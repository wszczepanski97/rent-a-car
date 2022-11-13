import type { NextPage } from "next";
import { MyRentalsPageProps } from "templates/client/myrentals/myrentals.props";
import RentalSection from "./components/rentalsection";

const MyRentalsPage: NextPage<MyRentalsPageProps> = ({
  futurerentals,
  pastrentals,
}) => (
  <>
    <RentalSection rentals={futurerentals} />
    <RentalSection rentals={pastrentals} />
  </>
);

export default MyRentalsPage;
