import React, { FC } from "react";
import { HandThumbsUp } from "react-bootstrap-icons";

type NoServicesPanelProps = {
  statement: string;
};

const NoServicesPanel: FC<NoServicesPanelProps> = ({ statement }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          border: "3px solid green",
          height: "80px",
          borderRadius: "50%",
          width: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HandThumbsUp size={40} color={"green"} />
      </div>
      <h5>{statement}</h5>
    </div>
  );
};

export default NoServicesPanel;
