import { FooterLinkSectionColumn } from "./molecules";
import {
  FooterLinkSectionColumnLink,
  FooterLinkSectionColumnTitle,
} from "./molecules/footerlinksectioncolumn/atoms";
import styles from "./footerlinksection.module.scss";

const FooterLinkSection = () => (
  <section className={styles.footerLinkSection}>
    <div className={styles.footerLinkSectionContainer}>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Company Info" />
        <FooterLinkSectionColumnLink text="About Us" />
        <FooterLinkSectionColumnLink text="Carrier" />
        <FooterLinkSectionColumnLink text="We are hiring" />
        <FooterLinkSectionColumnLink text="Blog" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Features" />
        <FooterLinkSectionColumnLink text="Business Marketing" />
        <FooterLinkSectionColumnLink text="User Analytic" />
        <FooterLinkSectionColumnLink text="Live Chat" />
        <FooterLinkSectionColumnLink text="Unlimited Support" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Resources" />
        <FooterLinkSectionColumnLink text="IOS & Android" />
        <FooterLinkSectionColumnLink text="Watch a Demo" />
        <FooterLinkSectionColumnLink text="Customers" />
        <FooterLinkSectionColumnLink text="API" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Get In Touch" />
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
