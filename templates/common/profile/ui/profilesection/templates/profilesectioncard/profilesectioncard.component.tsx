import { FC } from "react";
import { Card, CardType } from "ui";
import {
  ProfileDataColumn,
  ProfilePhotoColumn,
  ProfileSectionCardContainer,
  ProfileSectionCardHeader,
} from "./ui";
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
