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
        <FooterLinkSectionColumnTitle text="Informacje o firmie" />
        <FooterLinkSectionColumnLink text="O nas" />
        <FooterLinkSectionColumnLink text="Kariera" />
        <FooterLinkSectionColumnLink text="Zatrudniamy" />
        <FooterLinkSectionColumnLink text="Blog" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Funkcjonalności" />
        <FooterLinkSectionColumnLink text="Marketing Biznesowy" />
        <FooterLinkSectionColumnLink text="Analityka użytkownika" />
        <FooterLinkSectionColumnLink text="Chat Live" />
        <FooterLinkSectionColumnLink text="Nieograniczone wsparcie" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Zasoby" />
        <FooterLinkSectionColumnLink text="IOS & Android" />
        <FooterLinkSectionColumnLink text="Obejrzyj Demo" />
        <FooterLinkSectionColumnLink text="Klienci" />
        <FooterLinkSectionColumnLink text="API" />
      </FooterLinkSectionColumn>
      <FooterLinkSectionColumn>
        <FooterLinkSectionColumnTitle text="Pozostańmy w kontakcie" />
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
