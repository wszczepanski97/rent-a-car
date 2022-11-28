import type { FC } from "react";
import Photo from "ui/atoms/photo";

const OfficePhoto: FC = () => (
  <Photo
    size={{ height: "442", width: "600" }}
    src="/images/OfficePhoto.webp"
    alt="Office Photo"
  />
);

export default OfficePhoto;
