import { FC, useEffect, useState } from "react";

type ButtonsProps = {
  index: number;
  total: number;
  prevHandler: () => void;
  nextHandler: () => void;
};

const Buttons: FC<ButtonsProps> = ({
  index,
  total,
  prevHandler,
  nextHandler,
}) => {
  const [buttonsAttr, setButtonsAttr] = useState<(string | null)[]>();
  const getButtonsAttr = () =>
    Array.from(document.querySelectorAll("[data-carousel]")).map((el) =>
      el.getAttribute("data-carousel")
    );
  useEffect(() => {
    setButtonsAttr(getButtonsAttr());
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        zIndex: "100",
        bottom: "0",
        textAlign: "center",
      }}
    >
      {index !== 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            userSelect: "none",
            position: "absolute",
            bottom: "50vh",
            font: "16px/30px sans-serif",
            color: "rgba(255,255,255,0.8)",
            left: "30px",
          }}
          onClick={prevHandler}
        >
          <span>◀</span>
          {buttonsAttr && index > 0 ? buttonsAttr[index - 1] : null}
        </div>
      )}
      {index !== total - 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            userSelect: "none",
            position: "absolute",
            bottom: "50vh",
            font: "16px/30px sans-serif",
            color: "rgba(255,255,255,0.8)",
            right: "30px",
          }}
          onClick={nextHandler}
        >
          <span>▶</span>
          {buttonsAttr && index + 1 < total ? buttonsAttr[index + 1] : null}
        </div>
      )}
    </div>
  );
};

export default Buttons;
