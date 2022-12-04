import ServicesGridCardTable from "../../../components/servicesgridcard/components/servicesgridcardtable/servicesgridcardtable.component";

const PastServicesGridCardTable = () => (
  <ServicesGridCardTable
    dataProp="pastservices"
    statement="Nie masz żadnych przeszłych napraw"
    rowsPerPage={5}
  />
);

export default PastServicesGridCardTable;
