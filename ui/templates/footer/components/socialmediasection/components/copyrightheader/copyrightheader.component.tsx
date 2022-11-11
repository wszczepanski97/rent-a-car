import dynamic from "next/dynamic";

const Heading = dynamic(() => import("ui/atoms/heading/heading.component"));

const CopyrightHeader = () => (
  <Heading
    text="Car Rental Wszelkie prawa zastrzeżone"
    style={{ color: "var(--light-text-color)" }}
    as="h6"
  />
);

export default CopyrightHeader;
