import { CopyrightHeader } from "./atoms";
import { SocialMediaIconsBar } from "./molecules";

const SocialMediaSection = () => (
  <div
    style={{
      display: "flex",
      width: "1050px",
      margin: "0 auto",
      justifyContent: "space-between",
      padding: "25px 0",
    }}
  >
    <CopyrightHeader />
    <SocialMediaIconsBar />
  </div>
);

export default SocialMediaSection;
