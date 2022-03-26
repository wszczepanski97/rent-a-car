import { SocialMediaIcon } from "./atoms";

const SocialMediaIconsBar = () => (
  <div style={{ display: "flex", gap: "20px", padding: "0 40px" }}>
    <SocialMediaIcon src="/images/FacebookIcon.svg" alt="Facebook icon" />
    <SocialMediaIcon src="/images/InstagramIcon.svg" alt="Instagram icon" />
    <SocialMediaIcon src="/images/TwitterIcon.svg" alt="Twitter icon" />
    <SocialMediaIcon src="/images/YoutubeIcon.svg" alt="Youtube icon" />
  </div>
);

export default SocialMediaIconsBar;
