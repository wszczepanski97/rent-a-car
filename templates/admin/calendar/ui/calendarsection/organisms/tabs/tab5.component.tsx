import { FC, useRef } from "react";

type Tab5Props = {
  goStepBack(): void;
  onClick(description?: string): void;
};

export const Tab5: FC<Tab5Props> = ({ goStepBack, onClick }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div
      className="responsive-align"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 350,
        width: 500,
        gap: 20,
        margin: "0 auto",
      }}
    >
      <h4 className="e-textlabel">Opis usługi</h4>
      <textarea
        name="Opis"
        id="Opis"
        cols={60}
        rows={7}
        maxLength={150}
        style={{ resize: "none" }}
        ref={textareaRef}
        placeholder="Opisz usługę(opcjonalne)..."
      />
      <div
        className="btn-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
        }}
      >
        <button
          id="employee"
          className="e-btn"
          onClick={() => {
            onClick(textareaRef.current?.value);
          }}
          style={{ backgroundColor: "#5aad73", border: 0 }}
        >
          Przejdź dalej
        </button>
        <button
          id="goToSearch"
          className="e-btn"
          onClick={goStepBack}
          style={{ backgroundColor: "#ff5757", border: 0 }}
        >
          Wróć
        </button>
      </div>
    </div>
  );
};
