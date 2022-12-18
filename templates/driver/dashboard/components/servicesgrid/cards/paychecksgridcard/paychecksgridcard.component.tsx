import ServicesGridCard from "../../components/servicesgridcard/servicesgridcard.component";
import PaychecksTable from "./components/paychecksgridcardtable";

const PaychecksGridCard = () => (
  <ServicesGridCard title="Wypłaty">
    <PaychecksTable statement="Nie masz żadnych wypłat" />
  </ServicesGridCard>
);

export default PaychecksGridCard;
