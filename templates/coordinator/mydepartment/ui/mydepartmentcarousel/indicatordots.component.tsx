import React, { FC, memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

type DotProps = {
  selected: boolean;
  index: number;
  currentIndex: number;
  title: string;
  prevHandler: () => void;
  nextHandler: () => void;
};

const Dot: FC<DotProps> = memo((props) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      if (props.index > props.currentIndex) {
        for (let i = 0; i < props.index - props.currentIndex; i++) {
          setTimeout(props.nextHandler, 0);
        }
      } else {
        for (let i = 0; i < props.currentIndex - props.index; i++) {
          setTimeout(props.prevHandler, 0);
        }
      }
      setClicked(false);
    }
  }, [clicked]);
  return (
    <span
      style={{
        display: "inline-block",
        color: "white",
        opacity: props.selected ? "1" : "0.3",
        transitionDuration: "300ms",
        padding: 20,
      }}
      onClick={() => {
        setClicked(true);
      }}
    >
      {props.title}
    </span>
  );
});

type IndicatorDotsProps = {
  index: number;
  total: number;
  prevHandler: () => void;
  nextHandler: () => void;
};

export default function IndicatorDots(props: IndicatorDotsProps) {
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
        bottom: "0px",
        textAlign: "center",
      }}
    >
      {buttonsAttr?.map((title, i) => (
        <Dot
          key={i}
          index={i}
          currentIndex={props.index}
          selected={props.index === i}
          title={title as string}
          prevHandler={props.prevHandler}
          nextHandler={props.nextHandler}
        />
      ))}
    </div>
  );
}

IndicatorDots.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
