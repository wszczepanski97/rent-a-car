import type { FC } from "react";
import ProfileSectionCardHeader from "templates/common/profile/ui/profilesection/templates/profilesectioncard/ui/atoms/profilesectioncardheader/profilesectioncardheader.component";
import ProfileSectionCardContainer from "templates/common/profile/ui/profilesection/templates/profilesectioncard/ui/containers/profilesectioncardcontainer/profilesectioncardcontainer.component";
import ProfileDataColumn from "templates/common/profile/ui/profilesection/templates/profilesectioncard/ui/organisms/profiledatacolumn/profiledatacolumn.component";
import ProfilePhotoColumn from "templates/common/profile/ui/profilesection/templates/profilesectioncard/ui/organisms/profilephotocolumn/profilephotocolumn.component";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import styles from "./profilesectioncard.module.scss";

const ProfileSectionCard: FC = () => (
  <Card type={CardType.CUSTOM} className={styles.ProfileSectionCard}>
    <ProfileSectionCardHeader />
    <ProfileSectionCardContainer>
      <ProfileDataColumn />
      <ProfilePhotoColumn />
    </ProfileSectionCardContainer>
  </Card>
);

export default ProfileSectionCard;
