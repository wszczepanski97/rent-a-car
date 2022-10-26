const Main = () => {
  return (
    <main
      style={
        active
          ? {
              display: "grid",
              gridTemplateColumns: "15em 1fr",
              maxWidth: "100em",
              width: "90%",
              margin: "0 auto",
            }
          : undefined
      }
    ></main>
  );
};

export default Main;
