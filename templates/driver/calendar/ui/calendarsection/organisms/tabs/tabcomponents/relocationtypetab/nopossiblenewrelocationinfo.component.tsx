const NoPossibleNewRelocationInfo = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p>
      <b>Dla wypożyczenia istnieją już relokacje.</b>
    </p>
    <p>Nie możesz utworzyć kolejnych.</p>
    <p>
      Jeśli chcesz je edytować, skorzystaj <u>z kalendarza.</u>
    </p>
  </div>
);

export default NoPossibleNewRelocationInfo;
