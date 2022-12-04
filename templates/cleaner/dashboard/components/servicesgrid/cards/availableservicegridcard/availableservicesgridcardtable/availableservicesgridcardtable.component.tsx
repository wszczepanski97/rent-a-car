import ServicesGridCardTable from "../../../components/servicesgridcard/components/servicesgridcardtable/servicesgridcardtable.component";

const AvailableServicesGridCardTable = () => (
  <ServicesGridCardTable
    dataProp="availableservices"
    rowsPerPage={2}
    statement="Brak dostępnych wolnych myć"
    withButtonsAvailable
  />
);

export default AvailableServicesGridCardTable;
