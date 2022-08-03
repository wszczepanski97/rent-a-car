import React, { FC, useEffect, useState, forceRender } from "react";
type NavigationMenuProps = {
  index: number;
  total: number;
  prevHandler: () => void;
  nextHandler: () => void;
};

const NavigationMenu: FC<NavigationMenuProps> = ({
  index,
  total,
  prevHandler,
  nextHandler,
}) => {
  const [carouselSections, setCarouselSections] = useState<Element[] | null>(
    null
  );
  useEffect(() => {
    setCarouselSections(
      Array.from(document.querySelectorAll("[data-carousel]"))
    );
  }, []);
  const navigateToSection = (e) => {
    let sectionIndex = Number(e.target.getAttribute("data-carousel-index"));
    let indexCopy = index;
    while (indexCopy !== sectionIndex) {
      if (sectionIndex > index) {
        nextHandler();
        indexCopy++;
      } else {
        prevHandler();
        indexCopy--;
      }
      forceRender;
    }
  };
  return (
    <div>
      {carouselSections
        ? carouselSections.map((section, index) => (
            <h3 onClick={navigateToSection} data-carousel-index={index}>
              {section.getAttribute("data-carousel")}
            </h3>
          ))
        : null}
    </div>
  );
};

export default NavigationMenu;
