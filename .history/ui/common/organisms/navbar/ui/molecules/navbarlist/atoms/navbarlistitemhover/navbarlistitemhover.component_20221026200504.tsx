import { FC, useState } from "react";
import { Link } from "ui";

type NavbarListItemHoverOption = {
  name: string;
  href: string;
};

type NavbarListItemHoverProps = {
  title: string;
  options: NavbarListItemHoverOption[];
};
const NavbarListItemHover: FC<NavbarListItemHoverProps> = ({
  title,
  options,
}) => {
  const [showList, setShowList] = useState(true);
  return (
    <li
      onMouseOver={() => setShowList(true)}
      onMouseOut={() => setShowList(false)}
      style={{ position: "relative" }}
      id={title}
    >
      <Link name={title} href="" />
      <ul
        style={{
          display: showList ? "block" : "none",
          position: "absolute",
          listStyle: "none",
          backgroundColor: "var(--secondary-color-1)",
          borderRadius: 5,
          padding: 0,
        }}
      >
        {options.map((option) => (
          <li
            key={option.name}
            style={{
              display: "inline-block",
              padding: 5,
              whiteSpace: "nowrap",
              color: "var(--text-color)",
            }}
          >
            <Link {...option} />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavbarListItemHover;
