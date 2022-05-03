import { FC } from "react";
import { Photo } from "ui";

const OfficePhoto: FC = () => (
  <Photo
    size={{ height: "442", width: "600" }}
    src="/images/OfficePhoto.png"
    alt="Office Photo"
  />
);

export default OfficePhoto;
