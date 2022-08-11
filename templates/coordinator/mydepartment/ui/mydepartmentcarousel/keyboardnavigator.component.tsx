import { FC, useEffect } from "react";

type KeyboardNavigatorProps = {
  prevHandler: () => void;
  nextHandler: () => void;
};

const KeyboardNavigator: FC<KeyboardNavigatorProps> = ({
  prevHandler,
  nextHandler,
}) => {
  const onKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        prevHandler();
        break;
      case "ArrowRight":
        nextHandler();
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [onKeydown]);
  return null;
};

export default KeyboardNavigator;
