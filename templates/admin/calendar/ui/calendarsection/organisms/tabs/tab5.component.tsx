import { FC, useRef } from "react";

type Tab5Props = {
  goStepBack(): void;
  onClick(description?: string): void;
};

export const Tab5: FC<Tab5Props> = ({ goStepBack, onClick }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="responsive-align">
      <label htmlFor="Opis">Opis usługi</label>
      <textarea
        name="Opis"
        id="Opis"
        cols={30}
        rows={5}
        maxLength={150}
        style={{ resize: "none" }}
        ref={textareaRef}
      />
      <div className="btn-container">
        <button id="goToSearch" className="e-btn" onClick={goStepBack}>
          Wróć
        </button>
        <button
          id="employee"
          className="e-btn"
          onClick={() => {
            onClick(textareaRef.current?.value);
          }}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};
