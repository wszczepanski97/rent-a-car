import { FooterLinkSectionColumn } from "./molecules";
import {
  FooterLinkSectionColumnLink,
  FooterLinkSectionColumnTitle,
} from "./molecules/footerlinksectioncolumn/atoms";

const FooterLinkSection = () => (
  <section
    style={{ backgroundColor: "var(--secondary-color-2)", padding: "50px 0 " }}
  >
    <div
      style={{
        display: "flex",
        width: "1050px",
        margin: "0 auto",
        justifyContent: "space-between",
      }}
    >
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle title="Company Info" />
        <FooterLinkSectionColumnLink text="About Us" />
        <FooterLinkSectionColumnLink text="Carrier" />
        <FooterLinkSectionColumnLink text="We are hiring" />
        <FooterLinkSectionColumnLink text="Blog" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle title="Features" />
        <FooterLinkSectionColumnLink text="Business Marketing" />
        <FooterLinkSectionColumnLink text="User Analytic" />
        <FooterLinkSectionColumnLink text="Live Chat" />
        <FooterLinkSectionColumnLink text="Unlimited Support" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle title="Resources" />
        <FooterLinkSectionColumnLink text="IOS & Android" />
        <FooterLinkSectionColumnLink text="Watch a Demo" />
        <FooterLinkSectionColumnLink text="Customers" />
        <FooterLinkSectionColumnLink text="API" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle title="Get In Touch" />
        <FooterLinkSectionColumnLink
          text="(480) 555-0103"
          photoProps={{ src: "/images/PhoneBlue.svg", alt: "Phone" }}
        />
        <FooterLinkSectionColumnLink
          text="4517 Washington Ave."
          photoProps={{ src: "/images/PinBlue.svg", alt: "Pin" }}
        />
        <FooterLinkSectionColumnLink
          text="debra.holt@example.com"
          photoProps={{ src: "/images/KiteBlue.svg", alt: "Kite" }}
        />
      </FooterLinkSectionColumn>
    </div>
  </section>
);

export default FooterLinkSection;
