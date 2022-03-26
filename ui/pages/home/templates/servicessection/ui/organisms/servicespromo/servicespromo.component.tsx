import { OfficePhoto, ServicesPromoDescription } from "./molecules";

const ServicesPromo = () => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <OfficePhoto />
    <ServicesPromoDescription />
  </div>
);

export default ServicesPromo;
