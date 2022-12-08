import ServicesGridCardTable from "../../../components/servicesgridcard/components/servicesgridcardtable/servicesgridcardtable.component";

const FutureServicesGridCardTable = () => (
  <ServicesGridCardTable
    dataProp="futureservices"
    rowsPerPage={2}
    statement="Nie masz żadnych przyszłych relokacji"
    withButtonsFuture
  />
);

export default FutureServicesGridCardTable;
